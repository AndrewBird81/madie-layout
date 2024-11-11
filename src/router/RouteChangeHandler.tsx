import React, { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";
import { MadieDiscardDialog } from "@madie/madie-design-system/dist/react";
import { routeHandlerStore } from "@madie/madie-util";
// We have to listen at the top level for navigational changes to block them.
// Navigation must be aware of dirty form state.
export interface RouteHandlerState {
  canTravel: boolean;
  pendingRoute: string;
}
// Required by every single spa application that has internal routing
const RouteChangePrompt = () => {
  const { updateRouteHandlerState } = routeHandlerStore;
  const [routeHandlerState, setRouteHandlerState] = useState<RouteHandlerState>(
    routeHandlerStore.state
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const subscription = routeHandlerStore.subscribe(setRouteHandlerState);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isTopLevel = ({ pathname }) => {
    const singleRoutePattern = /^\/[^\/]+\/?$/;
    const detailsClickPattern = /^\/measures\/[a-f0-9]{24}\/edit\/details\/$/;
    // should return true if path matches singleRoutePattern or detailsClickPattern
    return (
      singleRoutePattern.test(pathname) || detailsClickPattern.test(pathname)
    );
  };
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (isTopLevel(nextLocation)) {
      if (
        !routeHandlerState?.canTravel &&
        currentLocation.pathname !== nextLocation.pathname
      ) {
        setDialogOpen(true);
        return true;
      }
      setDialogOpen(false);
      return false;
    }
  });

  const onContinue = () => {
    setDialogOpen(false);
    updateRouteHandlerState({
      canTravel: true,
      pendingRoute: "",
    });
    blocker.proceed();
  };
  const onClose = () => {
    setDialogOpen(false);
    blocker.reset();
  };

  return (
    <div>
      <MadieDiscardDialog
        open={dialogOpen}
        onContinue={onContinue}
        onClose={onClose}
      />
    </div>
  );
};
export default RouteChangePrompt;
