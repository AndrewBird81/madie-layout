import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MeasureActionCenter from "./MeasureActionCenter";
import { Measure } from "@madie/madie-models";

const draftMeasure = {
  id: "measure ID",
  createdBy: "testuser@example.com",
  model: "QI-Core v4.1.1",
  measureMetaData: { draft: true },
} as Measure;

const versionedMeasure = {
  id: "measure ID",
  createdBy: "testuser@example.com",
  model: "QI-Core v4.1.1",
  measureMetaData: { draft: false },
} as Measure;

describe("MeasureActionCenter Component", () => {
  it("renders the action center", () => {
    render(<MeasureActionCenter canEdit={true} measure={draftMeasure} />);
    expect(screen.getByTestId("action-center")).toBeInTheDocument();
  });

  it("should open action center on button click", () => {
    render(<MeasureActionCenter canEdit={true} measure={draftMeasure} />);
    const actionCenterButton = screen.getByTestId("action-center-button");
    fireEvent.click(actionCenterButton);
    expect(screen.getByTestId("DeleteMeasure")).toBeInTheDocument();
    expect(screen.getByTestId("VersionMeasure")).toBeInTheDocument();
    expect(screen.getByTestId("ExportMeasure")).toBeInTheDocument();
  });

  it("should open action center on button click", () => {
    render(<MeasureActionCenter canEdit={true} measure={versionedMeasure} />);
    const actionCenterButton = screen.getByTestId("action-center-button");
    fireEvent.click(actionCenterButton);
    expect(screen.queryByTestId("DeleteMeasure")).not.toBeInTheDocument();
    expect(screen.queryByTestId("VersionMeasure")).not.toBeInTheDocument();
    expect(screen.getByTestId("DraftMeasure")).toBeInTheDocument();
    expect(screen.getByTestId("ExportMeasure")).toBeInTheDocument();
  });

  it("should trigger delete-measure event when 'Delete Measure' action is clicked", () => {
    const dispatchEventSpy = jest.spyOn(window, "dispatchEvent");

    render(<MeasureActionCenter canEdit={true} measure={draftMeasure} />);

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
