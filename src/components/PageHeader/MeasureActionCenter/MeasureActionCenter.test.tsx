import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MeasureActionCenter from "./MeasureActionCenter";

describe("MeasureActionCenter Component", () => {
  it("renders the action center", () => {
    render(<MeasureActionCenter />);
    expect(screen.getByTestId("action-center")).toBeInTheDocument();
  });

  it("should open action center on button click", () => {
    render(<MeasureActionCenter />);
    const actionCenterButton = screen.getByTestId("action-center-button");
    fireEvent.click(actionCenterButton);
    expect(screen.getByTestId("DeleteMeasure")).toBeInTheDocument();
    expect(screen.getByTestId("ExportMeasure")).toBeInTheDocument();
  });

  it("should trigger delete-measure event when 'Delete Measure' action is clicked", () => {
    const dispatchEventSpy = jest.spyOn(window, "dispatchEvent");
    render(<MeasureActionCenter />);

    const actionCenterButton = screen.getByTestId("action-center-button");
    fireEvent.click(actionCenterButton);
    const deleteMeasureButton = screen.getByTestId("DeleteMeasure");
    fireEvent.click(deleteMeasureButton);

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "delete-measure",
      })
    );
  });
  it("should trigger export-measure event when 'Export Measure' action is clicked", () => {
    const dispatchEventSpy = jest.spyOn(window, "dispatchEvent");
    render(<MeasureActionCenter />);

    const actionCenterButton = screen.getByTestId("action-center-button");
    fireEvent.click(actionCenterButton);
    const exportMeasureButton = screen.getByTestId("ExportMeasure");
    fireEvent.click(exportMeasureButton);

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "export-measure",
      })
    );
  });
});
