import React, { useState, useEffect } from "react";

import { SpeedDial, SpeedDialAction } from "@mui/material";

import {
  DeleteOutlined as DeleteIcon,
  CallSplit as VersionIcon,
  EventNote as DraftIcon,
} from "@mui/icons-material";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Measure } from "@madie/madie-models";

interface PropTypes {
  canEdit: boolean;
  measure: Measure;
}

const MeasureActionCenter = (props: PropTypes) => {
  const [open, setOpen] = useState(false);
  const [actions, setActions] = useState<Array<any>>([]);

  useEffect(() => {
    setActions(getActionArray(props.measure, props.canEdit));
  }, [props]);

  const getActionArray = (measure: Measure, canEdit: boolean): any[] => {
    const actions: any[] = [
      {
        icon: <DeleteIcon />,
        name: "Delete Measure",
        onClick: () => {
          const eventDelete = new Event("delete-measure");
          window.dispatchEvent(eventDelete);
        },
      },
      {
        icon: <FileUploadOutlinedIcon />,
        name: "Export Measure",
        onClick: () => {
          const eventExport = new Event("export-measure");
          window.dispatchEvent(eventExport);
        },
      },
    ];
    if (canEdit) {
      if (measure?.measureMetaData.draft) {
        actions.push({
          icon: <DeleteIcon />,
          name: "Delete Measure",
          onClick: () => {
            const event = new Event("delete-measure");
            window.dispatchEvent(event);
          },
        });
        actions.push({
          icon: <VersionIcon />,
          name: "Version Measure",
          onClick: () => {
            const event = new Event("version-measure");
            window.dispatchEvent(event);
          },
        });
      }
      if (!measure?.measureMetaData.draft) {
        actions.push({
          icon: <DraftIcon />,
          name: "Draft Measure",
          onClick: () => {
            const event = new Event("draft-measure");
            window.dispatchEvent(event);
          },
        });
      }
    }
    return actions;
  };

  return (
    <div
      data-testid="action-center"
      style={{
        display: "flex",
        alignItems: "center",
        height: 40,
        backgroundColor: open ? "white" : "transparent",
        borderRadius: 25,
      }}
    >
      <SpeedDial
        ariaLabel="Measure action center"
        data-testid="action-center-button"
        sx={{
          "& .MuiSpeedDial-fab": {
            width: 40,
            height: 40,
            backgroundColor: "white",
            color: "grey",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          },
        }}
        icon={
          <div
            data-testid="action-center-actual-icon"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s",
              transform: open ? "rotate(90deg)" : "none",
            }}
          >
            <div style={{ margin: "0 2px", color: "black" }}>•</div>
            <div style={{ margin: "0 2px", color: "black" }}>•</div>
            <div style={{ margin: "0 2px", color: "black" }}>•</div>
          </div>
        }
        direction="left"
        open={open}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            data-testid={action.name.replace(/\s/g, "")}
            onClick={() => {
              setOpen(false);
              action.onClick();
            }}
            sx={{
              boxShadow: "none",
              transition: "opacity 0s, visibility 0s",
              margin: 0,
              marginRight: 1,
              transitionDelay: "0s",
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default MeasureActionCenter;
