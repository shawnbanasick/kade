import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import store from "../../../store";
// import calculateCorrelations from "../correlationsLogic/calcCorrelations";


class CorrelationTable extends Component {
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  // params.api.sizeColumnsToFit();
  };

  render() {
    // let numQsorts = store.getState("numQsorts");
    // let widthVal = 152 + 75 * numQsorts;
    // if (widthVal > window.innerWidth - 100) {
    //   widthVal = window.innerWidth - 100;
    // }
    // widthVal = widthVal + "px";
    const gridColDefs = store.getState("gridColDefs");
    const gridRowData = store.getState("gridRowData");
    const showCorrelationMatrix = store.getState("showCorrelationMatrix");

    const {onGridReady} = this;

    if (showCorrelationMatrix) {
      return (
        <TableHolder>
          <p style={ { fontWeight: "normal", marginTop: 15, textAlign: "left" } }>
            Click the table headers to re-sort by column (low-to-high, high-to-low, original sort).
          </p>
          <AgGridStyleWrapper style={ { height: '70vh', width: '80vw' } }>
            <div className="ag-theme-fresh">
              <AgGridWrapper>
                <AgGridReact columnDefs={ gridColDefs } rowData={ gridRowData } onGridReady={ onGridReady } gridAutoHeight={ true } enableSorting />
              </AgGridWrapper>
            </div>
          </AgGridStyleWrapper>
        </TableHolder>
        );
    }
    return null;

  }
}

export default view(CorrelationTable);

/*
const Shared = styled.div`
  color: green;
`

// ... then later

const ComponentOne = styled(Shared)`
  /* some non-shared styles */
// `
// const ComponentTwo = styled(Shared)`
/* some non-shared styles */


// className="ag-fresh"

const TableHolder = styled.div`
grid-area: main;
`;

const AgGridStyleWrapper = styled.div`

.ag-theme-fresh {
  background-color: white;
  color: black;
  font: 400 14px "Helvetica Neue", sans-serif; }
  .ag-theme-fresh .ag-body {
    background-color: #f6f6f6; }
  .ag-theme-fresh .ag-cell {
    box-sizing: border-box; }
  .ag-theme-fresh .ag-menu, .ag-theme-fresh .ag-theme-fresh.ag-dnd-ghost, .ag-theme-fresh .ag-cell-inline-editing, .ag-theme-fresh .ag-popup-editor, .ag-theme-fresh .ag-select-agg-func-popup, .ag-theme-fresh .ag-overlay-loading-center {
    background-color: #f6f6f6;
    border: 1px solid darkgrey; }
  .ag-theme-fresh .ag-tab-header .ag-tab {
    border: 1px solid transparent;
    border-bottom-width: 0;
    display: inline-block;
    margin: 4px;
    margin-bottom: 0;
    padding: 4px 8px; }
  .ag-theme-fresh .ag-tab-header .ag-tab.ag-tab-selected {
    background-color: #f6f6f6;
    border-bottom: 2px solid #f6f6f6 !important;
    border-color: darkgrey; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-1 {
    padding-left: 16px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-1 {
    padding-right: 16px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-1 {
    padding-left: 24px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-1 {
    padding-right: 24px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-2 {
    padding-left: 32px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-2 {
    padding-right: 32px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-2 {
    padding-left: 48px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-2 {
    padding-right: 48px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-3 {
    padding-left: 48px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-3 {
    padding-right: 48px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-3 {
    padding-left: 72px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-3 {
    padding-right: 72px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-4 {
    padding-left: 64px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-4 {
    padding-right: 64px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-4 {
    padding-left: 96px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-4 {
    padding-right: 96px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-5 {
    padding-left: 80px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-5 {
    padding-right: 80px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-5 {
    padding-left: 120px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-5 {
    padding-right: 120px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-6 {
    padding-left: 96px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-6 {
    padding-right: 96px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-6 {
    padding-left: 144px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-6 {
    padding-right: 144px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-7 {
    padding-left: 112px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-7 {
    padding-right: 112px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-7 {
    padding-left: 168px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-7 {
    padding-right: 168px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-8 {
    padding-left: 128px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-8 {
    padding-right: 128px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-8 {
    padding-left: 192px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-8 {
    padding-right: 192px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-9 {
    padding-left: 144px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-9 {
    padding-right: 144px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-9 {
    padding-left: 216px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-9 {
    padding-right: 216px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-10 {
    padding-left: 160px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-10 {
    padding-right: 160px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-10 {
    padding-left: 240px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-10 {
    padding-right: 240px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-11 {
    padding-left: 176px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-11 {
    padding-right: 176px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-11 {
    padding-left: 264px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-11 {
    padding-right: 264px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-12 {
    padding-left: 192px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-12 {
    padding-right: 192px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-12 {
    padding-left: 288px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-12 {
    padding-right: 288px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-13 {
    padding-left: 208px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-13 {
    padding-right: 208px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-13 {
    padding-left: 312px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-13 {
    padding-right: 312px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-14 {
    padding-left: 224px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-14 {
    padding-right: 224px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-14 {
    padding-left: 336px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-14 {
    padding-right: 336px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-15 {
    padding-left: 240px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-15 {
    padding-right: 240px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-15 {
    padding-left: 360px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-15 {
    padding-right: 360px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-16 {
    padding-left: 256px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-16 {
    padding-right: 256px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-16 {
    padding-left: 384px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-16 {
    padding-right: 384px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-17 {
    padding-left: 272px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-17 {
    padding-right: 272px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-17 {
    padding-left: 408px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-17 {
    padding-right: 408px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-18 {
    padding-left: 288px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-18 {
    padding-right: 288px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-18 {
    padding-left: 432px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-18 {
    padding-right: 432px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-19 {
    padding-left: 304px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-19 {
    padding-right: 304px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-19 {
    padding-left: 456px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-19 {
    padding-right: 456px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-20 {
    padding-left: 320px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-20 {
    padding-right: 320px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-20 {
    padding-left: 480px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-20 {
    padding-right: 480px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-21 {
    padding-left: 336px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-21 {
    padding-right: 336px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-21 {
    padding-left: 504px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-21 {
    padding-right: 504px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-22 {
    padding-left: 352px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-22 {
    padding-right: 352px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-22 {
    padding-left: 528px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-22 {
    padding-right: 528px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-23 {
    padding-left: 368px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-23 {
    padding-right: 368px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-23 {
    padding-left: 552px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-23 {
    padding-right: 552px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-24 {
    padding-left: 384px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-24 {
    padding-right: 384px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-24 {
    padding-left: 576px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-24 {
    padding-right: 576px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-25 {
    padding-left: 400px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-25 {
    padding-right: 400px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-25 {
    padding-left: 600px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-25 {
    padding-right: 600px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-26 {
    padding-left: 416px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-26 {
    padding-right: 416px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-26 {
    padding-left: 624px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-26 {
    padding-right: 624px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-27 {
    padding-left: 432px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-27 {
    padding-right: 432px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-27 {
    padding-left: 648px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-27 {
    padding-right: 648px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-28 {
    padding-left: 448px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-28 {
    padding-right: 448px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-28 {
    padding-left: 672px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-28 {
    padding-right: 672px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-29 {
    padding-left: 464px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-29 {
    padding-right: 464px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-29 {
    padding-left: 696px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-29 {
    padding-right: 696px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-30 {
    padding-left: 480px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-30 {
    padding-right: 480px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-30 {
    padding-left: 720px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-30 {
    padding-right: 720px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-31 {
    padding-left: 496px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-31 {
    padding-right: 496px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-31 {
    padding-left: 744px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-31 {
    padding-right: 744px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-32 {
    padding-left: 512px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-32 {
    padding-right: 512px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-32 {
    padding-left: 768px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-32 {
    padding-right: 768px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-33 {
    padding-left: 528px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-33 {
    padding-right: 528px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-33 {
    padding-left: 792px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-33 {
    padding-right: 792px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-34 {
    padding-left: 544px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-34 {
    padding-right: 544px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-34 {
    padding-left: 816px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-34 {
    padding-right: 816px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-35 {
    padding-left: 560px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-35 {
    padding-right: 560px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-35 {
    padding-left: 840px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-35 {
    padding-right: 840px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-36 {
    padding-left: 576px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-36 {
    padding-right: 576px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-36 {
    padding-left: 864px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-36 {
    padding-right: 864px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-37 {
    padding-left: 592px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-37 {
    padding-right: 592px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-37 {
    padding-left: 888px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-37 {
    padding-right: 888px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-38 {
    padding-left: 608px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-38 {
    padding-right: 608px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-38 {
    padding-left: 912px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-38 {
    padding-right: 912px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-39 {
    padding-left: 624px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-39 {
    padding-right: 624px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-39 {
    padding-left: 936px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-39 {
    padding-right: 936px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-40 {
    padding-left: 640px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-40 {
    padding-right: 640px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-40 {
    padding-left: 960px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-40 {
    padding-right: 960px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-41 {
    padding-left: 656px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-41 {
    padding-right: 656px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-41 {
    padding-left: 984px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-41 {
    padding-right: 984px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-42 {
    padding-left: 672px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-42 {
    padding-right: 672px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-42 {
    padding-left: 1008px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-42 {
    padding-right: 1008px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-43 {
    padding-left: 688px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-43 {
    padding-right: 688px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-43 {
    padding-left: 1032px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-43 {
    padding-right: 1032px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-44 {
    padding-left: 704px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-44 {
    padding-right: 704px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-44 {
    padding-left: 1056px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-44 {
    padding-right: 1056px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-45 {
    padding-left: 720px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-45 {
    padding-right: 720px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-45 {
    padding-left: 1080px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-45 {
    padding-right: 1080px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-46 {
    padding-left: 736px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-46 {
    padding-right: 736px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-46 {
    padding-left: 1104px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-46 {
    padding-right: 1104px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-47 {
    padding-left: 752px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-47 {
    padding-right: 752px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-47 {
    padding-left: 1128px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-47 {
    padding-right: 1128px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-48 {
    padding-left: 768px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-48 {
    padding-right: 768px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-48 {
    padding-left: 1152px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-48 {
    padding-right: 1152px; }
  .ag-theme-fresh .ag-ltr .ag-toolpanel-indent-49 {
    padding-left: 784px; }
  .ag-theme-fresh .ag-rtl .ag-toolpanel-indent-49 {
    padding-right: 784px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-indent-49 {
    padding-left: 1176px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-indent-49 {
    padding-right: 1176px; }
  .ag-theme-fresh .ag-ltr .ag-row-group-leaf-indent {
    margin-left: 24px; }
  .ag-theme-fresh .ag-rtl .ag-row-group-leaf-indent {
    margin-right: 24px; }
  .ag-theme-fresh .ag-rtl .ag-cell-first-right-pinned {
    border-left: 1px solid darkgrey; }
  .ag-theme-fresh .ag-ltr .ag-cell-first-right-pinned {
    border-left: 1px solid darkgrey; }
  .ag-theme-fresh .ag-rtl .ag-cell-last-left-pinned {
    border-right: 1px solid darkgrey; }
  .ag-theme-fresh .ag-ltr .ag-cell-last-left-pinned {
    border-right: 1px solid darkgrey; }
  .ag-theme-fresh .ag-value-change-delta {
    padding-right: 2px; }
  .ag-theme-fresh .ag-value-change-delta-up {
    color: darkgreen; }
  .ag-theme-fresh .ag-value-change-delta-down {
    color: darkred; }
  .ag-theme-fresh .ag-value-change-value {
    background-color: transparent;
    border-radius: 1px;
    padding-left: 1px;
    padding-right: 1px;
    transition: background-color 1s; }
  .ag-theme-fresh .ag-value-change-value-highlight {
    background-color: #cec;
    transition: background-color 0.1s; }
  .ag-theme-fresh .ag-header {
    background-color: transparent;
    color: #333333;
    font: 400 14px "Helvetica Neue", sans-serif; }
  .ag-theme-fresh .ag-header-row {
    border-bottom: 1px solid darkgrey;
    box-sizing: border-box; }
  .ag-theme-fresh .ag-row {
    border-bottom: 1px solid darkgrey;
    box-sizing: border-box; }
  .ag-theme-fresh .ag-row-odd {
    background-color: #f6f6f6; }
  .ag-theme-fresh .ag-row-even {
    background-color: white; }
  .ag-theme-fresh .ag-row-hover {
    background-color: ""; }
  .ag-theme-fresh .ag-numeric-cell {
    text-align: right; }
  .ag-theme-fresh .ag-header-cell-label {
    display: flex;
    float: left;
    height: 100%;
    width: calc(100% - 12px); }
    .ag-theme-fresh .ag-header-cell-label span {
      height: 100%; }
    .ag-theme-fresh .ag-header-cell-label > span {
      float: left; }
    .ag-theme-fresh .ag-header-cell-label .ag-header-icon {
      background-position-y: 10px;
      background-size: 14px 14px;
      height: 100%;
      margin: 0;
      margin-left: 4px;
      opacity: 1; }
    .ag-theme-fresh .ag-header-cell-label .ag-header-cell-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; }
  .ag-theme-fresh .ag-numeric-header .ag-header-cell-label {
    flex-direction: row-reverse;
    float: right; }
    .ag-theme-fresh .ag-numeric-header .ag-header-cell-label > span {
      float: right; }
  .ag-theme-fresh .ag-numeric-header .ag-header-cell-menu-button {
    float: left; }
  .ag-theme-fresh .ag-header-group-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; }
  .ag-theme-fresh .ag-header-cell,
  .ag-theme-fresh .ag-header-group-cell {
    line-height: 25px;
    padding-left: 12px;
    padding-right: 12px; }
  .ag-theme-fresh .ag-cell {
    line-height: 23px;
    padding-left: 12px;
    padding-right: 12px;
    border: 1px solid transparent;
    padding-left: 11px;
    padding-right: 11px; }
  .ag-theme-fresh .ag-row-drag {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yIDFoMnYySDJ6bTMgMGgydjJINXptMyAwaDJ2Mkg4eiIvPjxwYXRoIGQ9Ik04IDFoMnYySDh6TTIgNGgydjJIMnptMyAwaDJ2Mkg1em0zIDBoMnYySDh6TTIgN2gydjJIMnptMyAwaDJ2Mkg1em0zIDBoMnYySDh6bS02IDNoMnYySDJ6bTMgMGgydjJINXptMyAwaDJ2Mkg4eiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    background-position-x: left;
    background-position-y: 4px;
    float: left;
    height: 100%;
    width: 24px; }
  .ag-theme-fresh .ag-column-drag {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yIDFoMnYySDJ6bTMgMGgydjJINXptMyAwaDJ2Mkg4eiIvPjxwYXRoIGQ9Ik04IDFoMnYySDh6TTIgNGgydjJIMnptMyAwaDJ2Mkg1em0zIDBoMnYySDh6TTIgN2gydjJIMnptMyAwaDJ2Mkg1em0zIDBoMnYySDh6bS02IDNoMnYySDJ6bTMgMGgydjJINXptMyAwaDJ2Mkg4eiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    background-position-x: left;
    background-position-y: 4px !important;
    height: 100%;
    min-width: 16px; }
  .ag-theme-fresh .ag-row-dragging {
    opacity: 0.5;
    z-index: 10000; }
  .ag-theme-fresh .ag-ltr .ag-cell-focus {
    border: 1px solid black;
    outline: initial; }
  .ag-theme-fresh .ag-rtl .ag-cell-focus {
    border: 1px solid black;
    outline: initial; }
  .ag-theme-fresh .ag-header-cell-resize {
    position: absolute;
    right: -4px;
    width: 8px;
    z-index: 4; }
    .ag-theme-fresh .ag-header-cell-resize::after {
      border-right: 1px solid darkgrey;
      box-sizing: content-box;
      content: "resize";
      display: block;
      height: 9px;
      margin-top: 8px;
      overflow: hidden;
      text-indent: 4px;
      width: 4px; }
  .ag-theme-fresh .ag-icon-aggregation {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOS41IDIuNWgtNmwyIDMuNS0yIDMuNWg2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iIzMzMyIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-arrows {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMzMzIj48cGF0aCBkPSJNMTYgNmwtMS40MSAxLjQxTDE2LjE3IDlINHYyaDEyLjE3bC0xLjU4IDEuNTlMMTYgMTRsNC00eiIvPjxwYXRoIGQ9Ik00IDZsMS40MSAxLjQxTDMuODMgOUgxNnYySDMuODNsMS41OCAxLjU5TDQgMTRsLTQtNHoiLz48cGF0aCBkPSJNNiAxNmwxLjQxLTEuNDFMOSAxNi4xN1Y0aDJ2MTIuMTdsMS41OS0xLjU4TDE0IDE2bC00IDR6Ii8+PHBhdGggZD0iTTE0IDRsLTEuNDEgMS40MUwxMSAzLjgzVjE2SDlWMy44M0w3LjQxIDUuNDEgNiA0bDQtNHoiLz48L2c+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-asc {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDNoMnY5SDV6Ii8+PHBhdGggZD0iTTguOTkzIDUuMlYzLjQ5M2gtNnY2SDQuN1Y1LjJoNC4yOTN6IiBpZD0iYiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik01LjUgMy41aDF2OGgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSA1Ljk5MyA2LjQ5MykiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2IiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik04LjQ5MyA0Ljd2LS43MDdoLTV2NUg0LjJWNC43aDQuMjkzeiIvPjwvZz48L2c+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-checkbox-checked-readonly {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMzMzIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik05IDNMNiA4LjVsLTIuNS0yIi8+PC9nPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-checkbox-checked {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMzMzIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik05IDNMNiA4LjVsLTIuNS0yIi8+PC9nPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-checkbox-indeterminate-readonly {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMzMzIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMzMzIiBkPSJNNCA1aDR2Mkg0eiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-checkbox-indeterminate {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMzMzIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMzMzIiBkPSJNNCA1aDR2Mkg0eiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-checkbox-unchecked-readonly {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMzMzIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48L2c+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-checkbox-unchecked {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMzMzIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48L2c+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-column {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDR2Mkgxem0wIDNoNHY3SDF6IiBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-columns {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDR2Mkgxem02IDBoNHYySDd6TTEgNWg0djJIMXptNiAwaDR2Mkg3ek0xIDloNHYySDF6bTYgMGg0djJIN3oiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-contracted {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMzMzIiB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMzMzIiBkPSJNOSA1djJIM1Y1eiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-copy {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzMzMiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTQuNSA0LjVoNXY1aC01eiIvPjxwYXRoIGQ9Ik03LjUgMi41aC01djVoMnYyaDV2LTVoLTJ2LTJ6Ii8+PC9nPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-cut {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzMzMiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTMgMy4xMmMuNjY3LjA3OCAzIDEuNzQ1IDcgNS0uMzI2LjIwNC0uNjU5LjIwNC0xIDAtLjM0MS0uMjA2LTEuNjc0LTEuMjA2LTQtMyAwIC42NjYtLjY2Ny42NjYtMiAwLTItMS0xLTIuMTIgMC0yeiIvPjxwYXRoIGQ9Ik0zIDguMjY0Yy42NjctLjA4IDMtMS43NDYgNy01LS4zMjYtLjIwNS0uNjU5LS4yMDUtMSAwLS4zNDEuMjA0LTEuNjc0IDEuMjA0LTQgMyAwLS42NjctLjY2Ny0uNjY3LTIgMC0yIDEtMSAyLjExOSAwIDJ6Ii8+PC9nPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-desc {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDJoMnY5SDV6Ii8+PHBhdGggZD0iTTguOTkzIDYuMVY0LjM5M2gtNnY2SDQuN1Y2LjFoNC4yOTN6IiBpZD0iYiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik01LjUgMi41aDF2OGgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTM1IDUuOTkzIDcuMzkzKSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYiIvPjxwYXRoIHN0cm9rZT0iIzMzMyIgZD0iTTguNDkzIDUuNnYtLjcwN2gtNXY1SDQuMlY1LjZoNC4yOTN6Ii8+PC9nPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-expanded {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMzMzIiB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMzMzIiBkPSJNNSAzaDJ2Nkg1eiIvPjxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik05IDV2MkgzVjV6Ii8+PC9nPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-eye-slash {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zLjAwMSAzLjkwOEwzIDRhMyAzIDAgMSAwIDUuOTk5LS4wOTJBNS4yNDggNS4yNDggMCAwIDAgNiAzYy0xLjEgMC0yLjEuMzAzLTIuOTk5LjkwOHoiIGZpbGw9IiMzMzMiLz48cGF0aCBkPSJNNCA0LjVjLjY2Ny0uMzMzIDEuNjY3LS41IDMtLjUiIHN0cm9rZT0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik0xIDZjMS4zMzMtMiAzLTMgNS0zczMuNjY3IDEgNSAzQzkuNjY3IDggOCA5IDYgOVMyLjMzMyA4IDEgNnoiIHN0cm9rZT0iIzMzMyIvPjxwYXRoIGQ9Ik00LjAwNCAyLjgzNWw0Ljk5MiA2LjMzIiBzdHJva2U9IiMzMzMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiLz48cGF0aCBkPSJNMy4wMDQgMi44MzVsNC45OTIgNi4zMyIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-eye {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zLjAwMSAzLjkwOEwzIDRhMyAzIDAgMSAwIDUuOTk5LS4wOTJBNS4yNDggNS4yNDggMCAwIDAgNiAzYy0xLjEgMC0yLjEuMzAzLTIuOTk5LjkwOHoiIGZpbGw9IiMzMzMiLz48cGF0aCBkPSJNNCA0LjVjLjY2Ny0uMzMzIDEuNjY3LS41IDMtLjUiIHN0cm9rZT0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik0xIDZjMS4zMzMtMiAzLTMgNS0zczMuNjY3IDEgNSAzQzkuNjY3IDggOCA5IDYgOVMyLjMzMyA4IDEgNnoiIHN0cm9rZT0iIzMzMyIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-filter {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAyaDEwTDcgNnY1TDUgOVY2TDEgMnptNCA0djFoMlY2SDV6IiBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-group {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIHN0cm9rZT0iIzMzMyIgZD0iTTcuNSAxLjVoM3YyaC0zem0wIDRoM3YyaC0zem0wIDRoM3YyaC0zeiIvPjxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0yIDNoMXY4SDJ6bTEgM2g0djFIM3ptMi00aDN2MUg1eiIvPjxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0yIDEwaDV2MUgyeiIvPjxwYXRoIHN0cm9rZT0iIzMzMyIgZD0iTTEuNSAxLjVoM3YyaC0zeiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-indeterminate {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zLjA1NiA0LjU4MWEzLjAwMSAzLjAwMSAwIDAgMCA1Ljg4OCAwQzguMDU5IDQuMTk0IDcuMDc4IDQgNiA0Yy0xLjA3OCAwLTIuMDYuMTk0LTIuOTQ0LjU4MXoiIGZpbGw9IiMzMzMiLz48cGF0aCBkPSJNNCA1LjVjLjY2Ny0uMzMzIDEuNjY3LS41IDMtLjUiIHN0cm9rZT0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik0xIDZjMS4zMzMtMS4zMzMgMy0yIDUtMnMzLjY2Ny42NjcgNSAyQzkuNjY3IDcuMzMzIDggOCA2IDhzLTMuNjY3LS42NjctNS0yeiIgc3Ryb2tlPSIjMzMzIi8+PC9nPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-left {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNNy45OTMgNC43VjIuOTkzaC02djZIMy43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNi41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNNiAyaDF2OEg2eiIvPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgNC45OTMgNS45OTMpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNNy40OTMgNC4ydi0uNzA3aC01djVIMy4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-loading {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDFoMnYzSDV6Ii8+PHBhdGggaWQ9ImIiIGQ9Ik01IDhoMnYzSDV6Ii8+PHBhdGggaWQ9ImMiIGQ9Ik0xIDVoM3YySDF6Ii8+PHBhdGggaWQ9ImQiIGQ9Ik04IDVoM3YySDh6Ii8+PHBhdGggaWQ9ImUiIGQ9Ik00IDBoMnYzSDR6Ii8+PHBhdGggaWQ9ImYiIGQ9Ik00IDdoMnYzSDR6Ii8+PHBhdGggaWQ9ImciIGQ9Ik0wIDRoM3YySDB6Ii8+PHBhdGggaWQ9ImgiIGQ9Ik03IDRoM3YySDd6Ii8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYSIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTUuNSAxLjVoMXYyaC0xeiIvPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2IiLz48cGF0aCBzdHJva2U9IiM5Nzk3OTciIGQ9Ik01LjUgOC41aDF2MmgtMXoiLz48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNjIi8+PHBhdGggc3Ryb2tlPSIjOTc5Nzk3IiBkPSJNMS41IDUuNWgydjFoLTJ6Ii8+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjZCIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTguNSA1LjVoMnYxaC0yeiIvPjxnIG9wYWNpdHk9Ii43MTQiPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDQuMjkzIDYuNzA3KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjZSIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTQuNS41aDF2MmgtMXoiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNC4yOTMgNi43MDcpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNmIi8+PHBhdGggc3Ryb2tlPSIjOTc5Nzk3IiBkPSJNNC41IDcuNWgxdjJoLTF6Ii8+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDQuMjkzIDYuNzA3KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjZyIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTS41IDQuNWgydjFoLTJ6Ii8+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDQuMjkzIDYuNzA3KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjaCIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTcuNSA0LjVoMnYxaC0yeiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-menu {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDEwdjJIMXptMCA0aDEwdjJIMXptMCA0aDEwdjJIMXoiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-minus {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDh2MkgyeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-none {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDNoMnY2SDV6Ii8+PHBhdGggZD0iTTguMTQ2IDguMTgyVjYuNDc1aC01djVoMS43MDhWOC4xODJoMy4yOTJ6IiBpZD0iYiIvPjxwYXRoIGQ9Ik04LjUgMi45MTRWMS4yMDdoLTV2NWgxLjcwN1YyLjkxNEg4LjV6IiBpZD0iYyIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik01LjUgMy41aDF2NWgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTM1IDUuNjQ2IDguNDc1KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYiIvPjxwYXRoIHN0cm9rZT0iIzMzMyIgZD0iTTcuNjQ2IDcuNjgydi0uNzA3aC00djRoLjcwOFY3LjY4MmgzLjI5MnoiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNiAzLjcwNykiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2MiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik04IDIuNDE0di0uNzA3SDR2NGguNzA3VjIuNDE0SDh6Ii8+PC9nPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-not-allowed {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzMzMiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjQiLz48cGF0aCBkPSJNOC41IDMuNUwzLjQwMSA4LjU5OSIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-paste {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzMzMiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTIuNSAyLjVoN3Y3aC03eiIvPjxwYXRoIGQ9Ik02LjUgMS41aC0xdjJoLTF2MWgzdi0xaC0xdi0yeiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-pin {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0zIDJoNnYxSDh2NGwyIDFIN2wtMSAzLTEtM0gybDItMVYzSDN6Ii8+PHBhdGggZD0iTTUgM2gxdjRINXpNNCAzaDF2M0g0eiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-pivot {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzMzMiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHJlY3QgeD0iMS41IiB5PSIxLjUiIHdpZHRoPSI5IiBoZWlnaHQ9IjkiIHJ4PSIxIi8+PHBhdGggZD0iTTEwLjUgMy41aC05bTItMnY5IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIi8+PHBhdGggZD0iTTcuNSA2LjVsMS0xIDEgMW0tMyAxbC0xIDEgMSAxIi8+PHBhdGggZD0iTTguNSA1LjV2M2gtMyIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-plus {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01IDJoMnY4SDV6Ii8+PHBhdGggZD0iTTIgNWg4djJIMnoiLz48L2c+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-right {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik00LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNOS45OTMgNC43VjIuOTkzaC02djZINS43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNS41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNNSAyaDF2OEg1eiIvPjwvZz48ZyB0cmFuc2Zvcm09InNjYWxlKC0xIDEpIHJvdGF0ZSgtNDUgMCAyMi44NzQpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNOS40OTMgNC4ydi0uNzA3aC01djVINS4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-small-left {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA2bDQtNHY4eiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-small-right {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSAybDQgNC00IDR6IiBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-small-up {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA3bDQtNCA0IDR6IiBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-small-down {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDhMNiA5eiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-tick {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS41IDUuNWwzIDMgNi02IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iIzMzMyIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-cross {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiAxMGw4LThtMCA4TDIgMiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-tree-open {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDhMNiA5eiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-tree-closed {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSAybDQgNC00IDR6IiBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-icon-tree-indeterminate {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDh2MkgyeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px;
    display: inline-block; }
  .ag-theme-fresh .ag-header-cell-menu-button .ag-icon-menu {
    display: block;
    height: 25px; }
  .ag-theme-fresh .ag-icon-checkbox-checked:empty {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik05IDNMNiA4LjVsLTIuNS0yIi8+PC9nPjwvc3ZnPg==); }
  .ag-theme-fresh .ag-menu {
    background: #f6f6f6;
    border-radius: 0;
    box-shadow: none;
    padding: 4px;
    padding: 0;
    z-index: 5; }
    .ag-theme-fresh .ag-menu .ag-menu-list {
      cursor: default;
      margin-bottom: 4px;
      margin-top: 4px;
      width: 100%; }
    .ag-theme-fresh .ag-menu .ag-menu-option {
      line-height: 16px;
      padding-left: 8px;
      padding-right: 8px; }
      .ag-theme-fresh .ag-menu .ag-menu-option > span {
        display: table-cell;
        vertical-align: middle; }
    .ag-theme-fresh .ag-menu .ag-menu-option-active {
      background: ""; }
    .ag-theme-fresh .ag-menu .ag-menu-option-disabled {
      opacity: 0.5; }
    .ag-theme-fresh .ag-menu .ag-menu-option-icon {
      padding-left: 4px;
      padding-right: 4px; }
      .ag-theme-fresh .ag-menu .ag-menu-option-icon span {
        height: 12px;
        line-height: 0;
        margin-top: 4px; }
    .ag-theme-fresh .ag-menu .ag-menu-option-shortcut {
      padding-left: 8px; }
    .ag-theme-fresh .ag-menu .ag-menu-separator {
      margin-left: -4px; }
      .ag-theme-fresh .ag-menu .ag-menu-separator > span {
        background-image: url("data:image/svg+xml;utf8,<svg width='1' height='8px' viewBox='0 0 1 8px' xmlns='http://www.w3.org/2000/svg'> <line x1='0' y1='4px' x2='1' y2='4px' stroke-width='1' stroke='darkgrey'/> </svg>");
        height: 8px; }
    .ag-theme-fresh .ag-menu .ag-menu-option-popup-pointer {
      width: 20px; }
  .ag-theme-fresh.ag-dnd-ghost {
    background: #f6f6f6;
    border-radius: 0;
    box-shadow: none;
    padding: 4px;
    border: 1px solid darkgrey;
    color: #333333;
    font: 400 14px "Helvetica Neue", sans-serif;
    height: 25px !important;
    line-height: 25px;
    margin: 0;
    padding: 0 8px;
    transform: translateY(8px);
    z-index: 5; }
    .ag-theme-fresh.ag-dnd-ghost span,
    .ag-theme-fresh.ag-dnd-ghost div {
      float: left;
      height: 100%;
      margin: 0;
      padding: 0; }
    .ag-theme-fresh.ag-dnd-ghost .ag-dnd-ghost-icon {
      margin-right: 4px;
      opacity: 1; }
  .ag-theme-fresh .ag-tab-header {
    background: #f6f6f6;
    min-width: 220px;
    width: 100%; }
    .ag-theme-fresh .ag-tab-header .ag-tab {
      border-bottom: 2px solid transparent;
      height: 16px;
      text-align: center;
      vertical-align: middle; }
      .ag-theme-fresh .ag-tab-header .ag-tab.ag-tab-selected .ag-icon-filter {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAyaDEwTDcgNnY1TDUgOVY2TDEgMnptNCA0djFoMlY2SDV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=);
        display: inline-block; }
      .ag-theme-fresh .ag-tab-header .ag-tab.ag-tab-selected .ag-icon-columns {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDR2Mkgxem02IDBoNHYySDd6TTEgNWg0djJIMXptNiAwaDR2Mkg3ek0xIDloNHYySDF6bTYgMGg0djJIN3oiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
        display: inline-block; }
      .ag-theme-fresh .ag-tab-header .ag-tab.ag-tab-selected .ag-icon-menu {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDEwdjJIMXptMCA0aDEwdjJIMXptMCA0aDEwdjJIMXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
        display: inline-block; }
  .ag-theme-fresh .ag-tab-body {
    padding: 4px 0; }
    .ag-theme-fresh .ag-tab-body .ag-filter-select {
      margin: 4px;
      width: calc(100% - 8px); }
    .ag-theme-fresh .ag-tab-body .ag-menu-list {
      margin-bottom: 0;
      margin-top: 0; }
      .ag-theme-fresh .ag-tab-body .ag-menu-list > div:first-child > span {
        padding-top: 0; }
      .ag-theme-fresh .ag-tab-body .ag-menu-list > div:last-child > span {
        padding-bottom: 0; }
      .ag-theme-fresh .ag-tab-body .ag-menu-list > div:last-child > .ag-menu-option-popup-pointer {
        background-position-y: 0; }
  .ag-theme-fresh .ag-filter-select {
    margin: 4px;
    width: calc(100% - 8px); }
  .ag-theme-fresh .ag-filter input[type="radio"] {
    margin: 0 3px 0 6px;
    width: 12px;
    height: 17px;
    vertical-align: top; }
  .ag-theme-fresh .ag-filter input[type="text"],
  .ag-theme-fresh .ag-filter input[type="date"] {
    padding-left: 4px; }
  .ag-theme-fresh .ag-filter label {
    display: block;
    padding-left: 4px; }
  .ag-theme-fresh .ag-filter .ag-set-filter-list {
    height: 130px;
    padding-top: 4px; }
  .ag-theme-fresh .ag-filter .ag-filter-header-container {
    box-sizing: border-box;
    height: 20px; }
  .ag-theme-fresh .ag-filter .ag-filter-header-container:nth-child(2) {
    border-bottom: 1px solid darkgrey; }
  .ag-theme-fresh .ag-filter .ag-filter-checkbox {
    float: left;
    height: 20px;
    margin-right: 4px;
    padding-top: 2px; }
  .ag-theme-fresh .ag-filter .ag-filter-value {
    height: 20px;
    line-height: 14px; }
  .ag-theme-fresh .ag-filter .ag-filter-apply-panel {
    display: flex;
    justify-content: flex-end;
    padding: 4px;
    padding-top: 8px; }
    .ag-theme-fresh .ag-filter .ag-filter-apply-panel button + button {
      margin-left: 8px; }
  .ag-theme-fresh .ag-column-select-panel .ag-column-select-column-group,
  .ag-theme-fresh .ag-column-select-panel .ag-column-select-column {
    height: 16px;
    line-height: 16px;
    margin-left: 0; }
    .ag-theme-fresh .ag-column-select-panel .ag-column-select-column-group span,
    .ag-theme-fresh .ag-column-select-panel .ag-column-select-column span {
      float: left;
      height: 100%; }
    .ag-theme-fresh .ag-column-select-panel .ag-column-select-column-group .ag-column-select-indent,
    .ag-theme-fresh .ag-column-select-panel .ag-column-select-column .ag-column-select-indent {
      width: 8px; }
    .ag-theme-fresh .ag-column-select-panel .ag-column-select-column-group .ag-column-select-checkbox,
    .ag-theme-fresh .ag-column-select-panel .ag-column-select-column-group .ag-column-group-icons,
    .ag-theme-fresh .ag-column-select-panel .ag-column-select-column .ag-column-select-checkbox,
    .ag-theme-fresh .ag-column-select-panel .ag-column-select-column .ag-column-group-icons {
      margin-left: 4px;
      margin-right: 4px; }
  .ag-theme-fresh .ag-column-select-panel .ag-column-container {
    padding-top: 4px; }
  .ag-theme-fresh .ag-column-select-panel .ag-column-select-column.ag-toolpanel-add-group-indent {
    margin-left: 20px; }
  .ag-theme-fresh .ag-column-tool-panel {
    display: flex; }
  .ag-theme-fresh .ag-filter-body {
    flex-grow: 1;
    flex-shrink: 1;
    padding-right: 4px; }
  .ag-theme-fresh .ag-column-tool-panel-item button {
    font-family: "Helvetica Neue", sans-serif;
    font-size: 14px;
    height: 100%; }
  .ag-theme-fresh .ag-filter-filter {
    margin-bottom: 4px; }
  .ag-theme-fresh .ag-column-select-header {
    border-bottom: 1px solid darkgrey;
    box-sizing: border-box;
    height: 25px;
    padding-top: 4px; }
    .ag-theme-fresh .ag-column-select-header label {
      display: block;
      padding-left: 4px; }
      .ag-theme-fresh .ag-column-select-header label .ag-filter-checkbox {
        float: left;
        margin-right: 4px; }
    .ag-theme-fresh .ag-column-select-header .ag-column-tool-panel a {
      margin: 0 4px;
      padding-top: 2px; }
  .ag-theme-fresh .ag-group-child-count::before {
    content: " "; }
  .ag-theme-fresh .ag-column-panel {
    border-right: 0; }
    .ag-theme-fresh .ag-column-panel .ag-pivot-mode {
      border-bottom: 1px solid darkgrey;
      box-sizing: border-box;
      height: 25px;
      line-height: 25px; }
      .ag-theme-fresh .ag-column-panel .ag-pivot-mode span {
        float: left;
        height: 100%; }
      .ag-theme-fresh .ag-column-panel .ag-pivot-mode .ag-pivot-mode-select {
        margin-left: 4px; }
        .ag-theme-fresh .ag-column-panel .ag-pivot-mode .ag-pivot-mode-select .ag-checkbox-label {
          margin-left: 4px; }
    .ag-theme-fresh .ag-column-panel .ag-column-select-panel {
      border-bottom: 1px solid darkgrey;
      padding-bottom: 3px;
      padding-top: 0; }
    .ag-theme-fresh .ag-column-panel .ag-column-drop {
      border-bottom: 1px solid darkgrey;
      clear: both;
      overflow: auto;
      padding: 4px 0;
      padding-bottom: 8px; }
      .ag-theme-fresh .ag-column-panel .ag-column-drop .ag-icon {
        float: left;
        height: 20px;
        margin: 0 4px; }
      .ag-theme-fresh .ag-column-panel .ag-column-drop .ag-column-drop-title {
        clear: right;
        float: left;
        height: 20px;
        line-height: 20px;
        width: calc(100% - 20px); }
      .ag-theme-fresh .ag-column-panel .ag-column-drop .ag-column-drop-empty-message {
        clear: both;
        color: rgba(0, 0, 0, 0.5);
        font: 400 14px "Helvetica Neue", sans-serif;
        line-height: 8px;
        padding-left: 16px;
        padding-right: 4px; }
      .ag-theme-fresh .ag-column-panel .ag-column-drop:last-child {
        border-bottom: 0; }
  .ag-theme-fresh .ag-filter-icon:empty {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAyaDEwTDcgNnY1TDUgOVY2TDEgMnptNCA0djFoMlY2SDV6IiBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px; }
  .ag-theme-fresh .ag-sort-ascending-icon:empty {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDNoMnY5SDV6Ii8+PHBhdGggZD0iTTguOTkzIDUuMlYzLjQ5M2gtNnY2SDQuN1Y1LjJoNC4yOTN6IiBpZD0iYiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik01LjUgMy41aDF2OGgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSA1Ljk5MyA2LjQ5MykiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2IiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik04LjQ5MyA0Ljd2LS43MDdoLTV2NUg0LjJWNC43aDQuMjkzeiIvPjwvZz48L2c+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px; }
  .ag-theme-fresh .ag-sort-descending-icon:empty {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDJoMnY5SDV6Ii8+PHBhdGggZD0iTTguOTkzIDYuMVY0LjM5M2gtNnY2SDQuN1Y2LjFoNC4yOTN6IiBpZD0iYiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik01LjUgMi41aDF2OGgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTM1IDUuOTkzIDcuMzkzKSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYiIvPjxwYXRoIHN0cm9rZT0iIzMzMyIgZD0iTTguNDkzIDUuNnYtLjcwN2gtNXY1SDQuMlY1LjZoNC4yOTN6Ii8+PC9nPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px; }
  .ag-theme-fresh .ag-sort-none-icon:empty {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDNoMnY2SDV6Ii8+PHBhdGggZD0iTTguMTQ2IDguMTgyVjYuNDc1aC01djVoMS43MDhWOC4xODJoMy4yOTJ6IiBpZD0iYiIvPjxwYXRoIGQ9Ik04LjUgMi45MTRWMS4yMDdoLTV2NWgxLjcwN1YyLjkxNEg4LjV6IiBpZD0iYyIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik01LjUgMy41aDF2NWgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTM1IDUuNjQ2IDguNDc1KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYiIvPjxwYXRoIHN0cm9rZT0iIzMzMyIgZD0iTTcuNjQ2IDcuNjgydi0uNzA3aC00djRoLjcwOFY3LjY4MmgzLjI5MnoiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNiAzLjcwNykiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2MiLz48cGF0aCBzdHJva2U9IiMzMzMiIGQ9Ik04IDIuNDE0di0uNzA3SDR2NGguNzA3VjIuNDE0SDh6Ii8+PC9nPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px; }
  .ag-theme-fresh .ag-numeric-header .ag-header-cell-label .ag-header-icon {
    margin-left: 0;
    margin-right: 4px; }
  .ag-theme-fresh .ag-paging-panel {
    align-items: center;
    border-top: 1px solid darkgrey;
    color: #333333;
    display: flex;
    height: 25px;
    justify-content: flex-end;
    padding: 0 12px; }
    .ag-theme-fresh .ag-paging-panel > span {
      margin-left: 16px; }
  .ag-theme-fresh .ag-row-selected {
    background-color: #bde2e5; }
  .ag-theme-fresh .ag-cell-range-selected:not(.ag-cell-focus) {
    background-color: rgba(120, 120, 120, 0.4); }
  .ag-theme-fresh .ag-cell-inline-editing {
    background: #f6f6f6;
    border-radius: 0;
    box-shadow: none;
    padding: 4px;
    height: 37px;
    line-height: normal;
    padding: 12px;
    z-index: 2; }
    .ag-theme-fresh .ag-cell-inline-editing select {
      height: auto; }
  .ag-theme-fresh .ag-popup-editor {
    background: #f6f6f6;
    border-radius: 0;
    box-shadow: none;
    padding: 4px;
    padding: 0;
    z-index: 1; }
    .ag-theme-fresh .ag-popup-editor .ag-large-textarea textarea {
      height: auto;
      padding: 12px; }
  .ag-theme-fresh .ag-rich-select {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDhMNiA5eiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
    background-position-x: calc(100% - 4px);
    background-position-y: 8px;
    background-repeat: no-repeat; }
    .ag-theme-fresh .ag-rich-select .ag-rich-select-list {
      height: 162.5px; }
    .ag-theme-fresh .ag-rich-select .ag-rich-select-value {
      height: 25px;
      line-height: 25px;
      padding-left: 12px; }
    .ag-theme-fresh .ag-rich-select .ag-virtual-list-item {
      cursor: default;
      height: 25px;
      line-height: 25px; }
      .ag-theme-fresh .ag-rich-select .ag-virtual-list-item:hover {
        background-color: ""; }
    .ag-theme-fresh .ag-rich-select .ag-rich-select-row {
      padding-left: 12px; }
    .ag-theme-fresh .ag-rich-select .ag-rich-select-row-selected {
      background-color: #bde2e5; }
  .ag-theme-fresh .ag-floating-filter-body {
    float: left;
    height: 100%;
    margin-right: 0;
    width: calc(100% - 20px); }
    .ag-theme-fresh .ag-floating-filter-body input {
      box-sizing: border-box; }
  .ag-theme-fresh .ag-floating-filter-full-body input {
    box-sizing: border-box; }
  .ag-theme-fresh .ag-floating-filter-button {
    float: right;
    line-height: 12px;
    margin-top: 10px; }
    .ag-theme-fresh .ag-floating-filter-button button {
      appearance: none;
      background: transparent;
      border: 0;
      height: 12px;
      padding: 0;
      width: 12px; }
  .ag-theme-fresh .ag-cell-label-container {
    height: 100%; }
  .ag-theme-fresh .ag-header-group-cell-label {
    height: 100%; }
    .ag-theme-fresh .ag-header-group-cell-label span {
      float: left;
      height: 100%; }
  .ag-theme-fresh .ag-header-select-all {
    height: 100%;
    margin-right: 12px; }
    .ag-theme-fresh .ag-header-select-all span {
      height: 100%; }
  .ag-theme-fresh .ag-header-select-all:not(.ag-hidden) + .ag-cell-label-container {
    float: left;
    width: calc(100% - 12px - 12px); }
  .ag-theme-fresh .ag-selection-checkbox span,
  .ag-theme-fresh .ag-group-expanded span,
  .ag-theme-fresh .ag-group-contracted span {
    margin-right: 12px; }
  .ag-theme-fresh .ag-selection-checkbox span {
    position: relative;
    top: 2px; }
  .ag-theme-fresh .ag-group-expanded .ag-icon-contracted:empty {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDhMNiA5eiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px; }
  .ag-theme-fresh .ag-column-drop-horizontal {
    background-color: #f6f6f6;
    height: 25px;
    line-height: 16px;
    padding-left: 12px; }
    .ag-theme-fresh .ag-column-drop-horizontal.ag-width-half {
      margin-bottom: -3px; }
    .ag-theme-fresh .ag-column-drop-horizontal span {
      float: left;
      height: 100%; }
    .ag-theme-fresh .ag-column-drop-horizontal > div:first-child {
      float: left;
      height: 100%; }
    .ag-theme-fresh .ag-column-drop-horizontal .ag-icon-group,
    .ag-theme-fresh .ag-column-drop-horizontal .ag-icon-pivot {
      margin-right: 12px; }
    .ag-theme-fresh .ag-column-drop-horizontal .ag-right-arrow {
      background-color: transparent;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik00LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNOS45OTMgNC43VjIuOTkzaC02djZINS43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNS41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNNSAyaDF2OEg1eiIvPjwvZz48ZyB0cmFuc2Zvcm09InNjYWxlKC0xIDEpIHJvdGF0ZSgtNDUgMCAyMi44NzQpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNOS40OTMgNC4ydi0uNzA3aC01djVINS4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 12px 12px;
      height: 12px;
      opacity: 1;
      width: 12px; }
    .ag-theme-fresh .ag-column-drop-horizontal .ag-left-arrow {
      background-color: transparent;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNNy45OTMgNC43VjIuOTkzaC02djZIMy43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNi41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNNiAyaDF2OEg2eiIvPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgNC45OTMgNS45OTMpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNNy40OTMgNC4ydi0uNzA3aC01djVIMy4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 12px 12px;
      height: 12px;
      opacity: 1;
      width: 12px; }
    .ag-theme-fresh .ag-column-drop-horizontal .ag-left-arrow,
    .ag-theme-fresh .ag-column-drop-horizontal .ag-right-arrow {
      overflow: hidden;
      text-indent: 100%;
      height: 100%;
      margin: 0 4px;
      opacity: 1; }
    .ag-theme-fresh .ag-column-drop-horizontal .ag-column-drop-empty-message {
      height: 100%;
      line-height: 25px;
      opacity: 0.5; }
  .ag-theme-fresh .ag-column-drop-cell {
    background: #ecf0f1;
    border-radius: 16px;
    box-sizing: border-box;
    height: 16px !important;
    margin-top: 4px;
    padding: 0 2px; }
    .ag-theme-fresh .ag-column-drop-cell .ag-column-drop-cell-text {
      height: 100%;
      line-height: 16px;
      margin: 0 4px; }
    .ag-theme-fresh .ag-column-drop-cell .ag-column-drop-cell-button {
      background-color: transparent;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOSA4LjE1NEw4LjE1NCA5IDYgNi44NDYgMy44NDYgOSAzIDguMTU0IDUuMTU0IDYgMyAzLjg0NiAzLjg0NiAzIDYgNS4xNTQgOC4xNTQgMyA5IDMuODQ2IDYuODQ2IDZ6IiBmaWxsPSIjMzMzIi8+PC9zdmc+);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 12px 12px;
      height: 12px;
      opacity: 1;
      width: 12px;
      overflow: hidden;
      text-indent: 100%;
      min-width: 16px;
      height: 100%;
      margin: 0 2px;
      opacity: 1; }
      .ag-theme-fresh .ag-column-drop-cell .ag-column-drop-cell-button:hover {
        opacity: 1; }
    .ag-theme-fresh .ag-column-drop-cell .ag-column-drag {
      margin-left: 8px;
      margin-top: 2px;
      width: 12px; }
  .ag-theme-fresh .ag-select-agg-func-popup {
    background: #f6f6f6;
    border-radius: 0;
    box-shadow: none;
    padding: 4px;
    background: white;
    height: 70px;
    padding: 0; }
    .ag-theme-fresh .ag-select-agg-func-popup .ag-virtual-list-item {
      cursor: default;
      line-height: 20px;
      padding-left: 8px; }
    .ag-theme-fresh .ag-select-agg-func-popup .ag-virtual-list-item:hover {
      background-color: #bde2e5; }
  .ag-theme-fresh .ag-set-filter-list,
  .ag-theme-fresh .ag-menu-column-select-wrapper {
    width: auto; }
  .ag-theme-fresh .ag-column-drop-vertical > .ag-column-drop-cell {
    float: left;
    margin-bottom: 4px;
    margin-left: 4px;
    margin-top: 0; }
  .ag-theme-fresh .ag-cell-data-changed {
    background-color: #cec !important; }
  .ag-theme-fresh .ag-cell-data-changed-animation {
    background-color: transparent;
    transition: background-color 1s; }
  .ag-theme-fresh .ag-row-stub {
    background-color: #f0f0f0; }
  .ag-theme-fresh .ag-stub-cell {
    padding-left: 12px;
    padding-top: 4px; }
    .ag-theme-fresh .ag-stub-cell .ag-loading-icon {
      float: left;
      height: 100%; }
    .ag-theme-fresh .ag-stub-cell .ag-loading-text {
      float: left;
      height: 100%;
      margin-left: 4px;
      margin-top: 4px; }
  .ag-theme-fresh .ag-floating-top {
    background-color: #f0f0f0; }
    .ag-theme-fresh .ag-floating-top .ag-row {
      background-color: #f0f0f0; }
  .ag-theme-fresh .ag-floating-bottom {
    background-color: #f0f0f0; }
  .ag-theme-fresh .ag-rtl .ag-numeric-cell {
    text-align: left; }
  .ag-theme-fresh .ag-rtl .ag-header-cell-menu-button {
    float: left; }
  .ag-theme-fresh .ag-rtl .ag-header-cell-label {
    float: right;
    width: calc(100% - 12px); }
    .ag-theme-fresh .ag-rtl .ag-header-cell-label > span {
      float: right; }
    .ag-theme-fresh .ag-rtl .ag-header-cell-label .ag-header-icon {
      margin-top: 2px; }
  .ag-theme-fresh .ag-rtl .ag-numeric-header .ag-header-cell-menu-button {
    float: right; }
  .ag-theme-fresh .ag-rtl .ag-numeric-header .ag-header-cell-label {
    float: left; }
    .ag-theme-fresh .ag-rtl .ag-numeric-header .ag-header-cell-label > span {
      float: left; }
  .ag-theme-fresh .ag-rtl .ag-column-panel .ag-pivot-mode span {
    float: right; }
  .ag-theme-fresh .ag-rtl .ag-column-panel .ag-pivot-mode .ag-pivot-mode-select {
    margin-right: 4px; }
    .ag-theme-fresh .ag-rtl .ag-column-panel .ag-pivot-mode .ag-pivot-mode-select .ag-checkbox-label {
      margin-right: 4px; }
  .ag-theme-fresh .ag-rtl .ag-column-panel .ag-column-drop .ag-icon {
    float: right; }
  .ag-theme-fresh .ag-rtl .ag-column-panel .ag-column-drop .ag-column-drop-title {
    clear: left;
    float: right; }
  .ag-theme-fresh .ag-rtl .ag-column-panel .ag-column-drop .ag-column-drop-empty-message {
    padding-left: 4px;
    padding-right: 16px; }
  .ag-theme-fresh .ag-rtl .ag-filter-checkbox {
    float: right;
    margin-left: 4px; }
  .ag-theme-fresh .ag-rtl .ag-column-select-panel .ag-column-select-column-group span,
  .ag-theme-fresh .ag-rtl .ag-column-select-panel .ag-column-select-column span {
    float: right; }
  .ag-theme-fresh .ag-rtl .ag-column-select-panel .ag-column-select-column-group .ag-column-select-checkbox,
  .ag-theme-fresh .ag-rtl .ag-column-select-panel .ag-column-select-column-group .ag-column-group-icons,
  .ag-theme-fresh .ag-rtl .ag-column-select-panel .ag-column-select-column .ag-column-select-checkbox,
  .ag-theme-fresh .ag-rtl .ag-column-select-panel .ag-column-select-column .ag-column-group-icons {
    margin-left: 4px;
    margin-right: 4px; }
  .ag-theme-fresh .ag-rtl .ag-column-select-panel .ag-column-select-column.ag-toolpanel-add-group-indent {
    margin-left: 0;
    margin-right: 20px; }
  .ag-theme-fresh .ag-rtl .ag-icon-tree-closed {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMzMzIiB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMzMzIiBkPSJNOSA1djJIM1Y1eiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px; }
  .ag-theme-fresh .ag-rtl .ag-header-group-cell-label {
    height: 100%; }
    .ag-theme-fresh .ag-rtl .ag-header-group-cell-label span {
      float: right;
      height: 100%; }
  .ag-theme-fresh .ag-rtl .ag-header-select-all:not(.ag-hidden) + .ag-cell-label-container {
    float: right; }
  .ag-theme-fresh .ag-rtl .ag-header-select-all {
    margin-left: 12px;
    margin-right: 0; }
  .ag-theme-fresh .ag-rtl .ag-selection-checkbox span,
  .ag-theme-fresh .ag-rtl .ag-group-expanded span,
  .ag-theme-fresh .ag-rtl .ag-group-contracted span {
    margin-left: 12px;
    margin-right: 0; }
  .ag-theme-fresh .ag-rtl .ag-column-drop-horizontal {
    padding-right: 12px; }
    .ag-theme-fresh .ag-rtl .ag-column-drop-horizontal span {
      float: right; }
    .ag-theme-fresh .ag-rtl .ag-column-drop-horizontal > div:first-child {
      float: right; }
    .ag-theme-fresh .ag-rtl .ag-column-drop-horizontal .ag-icon-group,
    .ag-theme-fresh .ag-rtl .ag-column-drop-horizontal .ag-icon-pivot {
      margin-left: 12px;
      margin-right: 0; }
    .ag-theme-fresh .ag-rtl .ag-column-drop-horizontal .ag-right-arrow {
      background-color: transparent;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik00LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNOS45OTMgNC43VjIuOTkzaC02djZINS43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNS41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNNSAyaDF2OEg1eiIvPjwvZz48ZyB0cmFuc2Zvcm09InNjYWxlKC0xIDEpIHJvdGF0ZSgtNDUgMCAyMi44NzQpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNOS40OTMgNC4ydi0uNzA3aC01djVINS4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 12px 12px;
      height: 12px;
      opacity: 1;
      width: 12px;
      height: 100%; }
    .ag-theme-fresh .ag-rtl .ag-column-drop-horizontal .ag-left-arrow {
      background-color: transparent;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNNy45OTMgNC43VjIuOTkzaC02djZIMy43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNi41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNNiAyaDF2OEg2eiIvPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgNC45OTMgNS45OTMpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMzMzIiBkPSJNNy40OTMgNC4ydi0uNzA3aC01djVIMy4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 12px 12px;
      height: 12px;
      opacity: 1;
      width: 12px;
      height: 100%; }
  .ag-theme-fresh .ag-rtl .ag-floating-filter-body {
    float: right;
    margin-left: 0; }
  .ag-theme-fresh .ag-rtl .ag-floating-filter-button {
    float: left; }
  .ag-theme-fresh .ag-rtl .ag-header .ag-header-cell-resize {
    left: -4px;
    right: auto; }
  .ag-theme-fresh .ag-rtl .ag-header .ag-header-cell-resize::after {
    border-left: 1px solid darkgrey;
    border-right: 0; }
  .ag-theme-fresh .ag-rtl .ag-column-select-header .ag-filter-body {
    margin-left: 4px;
    margin-right: 0; }
  .ag-theme-fresh .ag-rtl .ag-column-drag {
    background-position-x: right; }
  .ag-theme-fresh .ag-status-bar {
    background: white;
    border: 1px solid darkgrey;
    border-top: 0;
    color: rgba(0, 0, 0, 0.5);
    display: flex;
    font: 400 14px "Helvetica Neue", sans-serif;
    justify-content: flex-end;
    padding: 8px 16px; }
    .ag-theme-fresh .ag-status-bar .ag-status-bar-item {
      margin-right: 8px; }
      .ag-theme-fresh .ag-status-bar .ag-status-bar-item span:nth-child(1)::after {
        content: ":"; }
      .ag-theme-fresh .ag-status-bar .ag-status-bar-item span:nth-child(2) {
        color: black; }
  .ag-theme-fresh .ag-details-row {
    box-sizing: border-box;
    padding: 20px; }
  .ag-theme-fresh .ag-overlay-loading-wrapper {
    background-color: rgba(255, 255, 255, 0.5); }
  .ag-theme-fresh .ag-overlay-loading-center {
    background: #f6f6f6;
    border-radius: 0;
    box-shadow: none;
    padding: 4px; }
  .ag-theme-fresh .ag-tool-panel {
    background-color: #f6f6f6;
    border-right: 1px solid darkgrey;
    border-top: 1px solid darkgrey; }
    .ag-theme-fresh .ag-tool-panel .ag-side-buttons {
      border-bottom: 1px solid darkgrey; }
      .ag-theme-fresh .ag-tool-panel .ag-side-buttons button {
        background: transparent;
        border: 0;
        border-right: 1px solid darkgrey;
        color: black;
        height: 20px; }
    .ag-theme-fresh .ag-tool-panel .ag-panel-container {
      border-right: 1px solid darkgrey;
      box-sizing: border-box; }
    .ag-theme-fresh .ag-tool-panel.full-width .ag-panel-container {
      border-right: 0; }
    .ag-theme-fresh .ag-tool-panel .ag-column-drop {
      min-height: 50px; }
  .ag-theme-fresh .ag-rtl .ag-tool-panel .ag-panel-container {
    border-left: 1px solid darkgrey;
    border-right: 0; }
  .ag-theme-fresh .ag-rtl .ag-tool-panel.full-width .ag-panel-container {
    border-left: 0; }
  .ag-theme-fresh .ag-rtl .ag-tool-panel .ag-side-buttons button {
    border-left: 1px solid darkgrey;
    border-right: 0; }
  .ag-theme-fresh .ag-column-name-filter {
    box-sizing: border-box;
    width: 100%; }
  .ag-theme-fresh .sass-variables::after {
    content: '{ "autoSizePadding": "12px", "headerHeight": "25px", "groupPaddingSize": "24px", "footerPaddingAddition": "16px", "virtualItemHeight": "20px", "aggFuncPopupHeight": "70px", "checkboxIndentWidth": "16px", "leafNodePadding": "12px", "rowHeight": "25px", "gridSize": "4px", "iconSize": "12px" }';
    display: none; }
  .ag-theme-fresh .ag-tab-header {
    background-color: #e6e6e6; }
  .ag-theme-fresh .ag-faded {
    opacity: 0.3; }
  .ag-theme-fresh .ag-column-drop-horizontal.ag-column-drop {
    border: 1px solid darkgrey;
    border-bottom: 0; }
  .ag-theme-fresh .ag-column-drop-horizontal.ag-column-drop:last-child {
    border-left: 0; }
  .ag-theme-fresh .ag-header {
    background-image: linear-gradient(white, lightgrey);
    border-bottom: 1px solid darkgrey; }
  .ag-theme-fresh .ag-header-cell-resize::after {
    height: 25px;
    margin-top: 0; }
  .ag-theme-fresh .ag-header-cell {
    border-right: 1px solid darkgrey;
    box-sizing: border-box; }
  .ag-theme-fresh .ag-header-group-cell {
    border-right: 1px solid darkgrey; }
  .ag-theme-fresh .ag-header-group-cell-with-group {
    border-bottom: 1px solid darkgrey; }
  .ag-theme-fresh .ag-header-row {
    border-bottom: 0; }
  .ag-theme-fresh .ag-root {
    border: 1px solid darkgrey; }
  .ag-theme-fresh .ag-column-panel {
    border-right: 1px solid darkgrey; }
  .ag-theme-fresh .ag-cell-no-focus {
    border-right: 1px dotted silver; }
  .ag-theme-fresh .ag-row {
    border-bottom-width: 0; }
  .ag-theme-fresh .ag-column-panel .ag-column-drop .ag-column-drop-empty-message {
    line-height: 25px; }
  .ag-theme-fresh .ag-floating-filter-button {
    margin-top: 8px; }
  .ag-theme-fresh .ag-filter .ag-filter-apply-panel {
    border-top: 1px solid darkgrey;
    justify-content: flex-start; }
  .ag-theme-fresh .ag-cell-focus {
    border: 1px solid darkgrey; }
  .ag-theme-fresh .ag-menu .ag-menu-option-active {
    background: #bde2e5; }
  .ag-theme-fresh .ag-menu .ag-menu-option {
    line-height: 24px; }
  .ag-theme-fresh .ag-column-drop-cell {
    background: #ecf0f1;
    background-image: linear-gradient(white, lightgrey);
    border: 1px solid darkgrey;
    border-radius: 0;
    height: 18px !important; }
    .ag-theme-fresh .ag-column-drop-cell .ag-column-drop-cell-button {
      box-sizing: border-box;
      height: calc(100% - 4px);
      margin-bottom: 2px;
      margin-top: 2px; }
    .ag-theme-fresh .ag-column-drop-cell .ag-column-drop-cell-button:hover {
      border: 1px solid darkgrey; }
  .ag-theme-fresh .ag-cell-range-selected-1:not(.ag-cell-focus) {
    background-color: rgba(120, 120, 120, 0.4); }
  .ag-theme-fresh .ag-cell-range-selected-2:not(.ag-cell-focus) {
    background-color: rgba(80, 80, 80, 0.4); }
  .ag-theme-fresh .ag-cell-range-selected-3:not(.ag-cell-focus) {
    background-color: rgba(40, 40, 40, 0.4); }
  .ag-theme-fresh .ag-cell-range-selected-4:not(.ag-cell-focus) {
    background-color: rgba(0, 0, 0, 0.4); }
  .ag-theme-fresh .ag-cell-highlight {
    background-color: rgba(120, 120, 120, 0.4);
    border-bottom: 2px solid darkgreen; }
  .ag-theme-fresh .ag-cell-highlight-animation {
    transition: all 1s; }
  .ag-theme-fresh .ag-group-expanded .ag-icon-contracted:empty {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMzMzIiB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMzMzIiBkPSJNOSA1djJIM1Y1eiIvPjwvZz48L3N2Zz4=);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px; }
  .ag-theme-fresh .ag-rtl .ag-icon-tree-closed {
    background-color: transparent;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA2bDQtNHY4eiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    height: 12px;
    opacity: 1;
    width: 12px; }
  .ag-theme-fresh .ag-cell-inline-editing {
    height: 25px;
    padding: 0; }
    .ag-theme-fresh .ag-cell-inline-editing input {
      box-sizing: border-box; }
  .ag-theme-fresh .ag-column-panel .ag-column-drop .ag-column-drop-title {
    float: none; }
  .ag-theme-fresh .ag-column-select-panel .ag-column-select-column-group,
  .ag-theme-fresh .ag-column-select-panel .ag-column-select-column {
    height: 20px;
    line-height: 20px; }
  .ag-theme-fresh .ag-filter .ag-filter-header-container {
    height: 24px; }
  .ag-theme-fresh .ag-tab {
    box-sizing: initial; }
  .ag-theme-fresh .ag-filter .ag-filter-value {
    line-height: 16px; }
  .ag-theme-fresh .ag-selection-checkbox span {
    position: relative;
    top: 0; }
  .ag-theme-fresh .ag-rich-select-value {
    border-bottom: 1px solid darkgrey; }
  .ag-theme-fresh .ag-header-cell-moving .ag-header-cell-label {
    opacity: 0.5; }
  .ag-theme-fresh .ag-header-cell-moving {
    background-color: #bebebe; }
  .ag-theme-fresh .ag-ltr .ag-pinned-right-header {
    border-left: 1px solid darkgrey; }
  .ag-theme-fresh .ag-rtl .ag-pinned-left-header {
    border-right: 1px solid darkgrey; }
  .ag-theme-fresh .ag-overlay-loading-wrapper {
    background-color: rgba(255, 255, 255, 0.5); }
  .ag-theme-fresh .ag-overlay-loading-center {
    background-color: #fff;
    border: 1px solid darkgrey;
    border-radius: 10px;
    color: black;
    padding: 10px; }
  .ag-theme-fresh .ag-column-name-filter {
    height: 16px; }
  .ag-theme-fresh .ag-column-drop-cell .ag-column-drag {
    background-position-y: 0 !important; }

`;


const AgGridWrapper = styled.div`

ag-grid-angular {
  display: block;
}

ag-grid-ng2 {
  display: block;
}

ag-grid {
  display: block;
}

ag-grid-polymer {
  display: block;
}

ag-grid-aurelia {
  display: block;
}

.ag-rtl {
  direction: rtl;
}

.ag-ltr {
  direction: ltr;
}

.ag-select-agg-func-popup {
  position: absolute;
}

.ag-body-no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ag-root-wrapper {
  position: relative;
}

.ag-root-wrapper.ag-layout-normal {
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.ag-root-wrapper-body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.ag-layout-normal.ag-root-wrapper-body {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 0px;
  min-height: 0px;
}

.ag-root {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: inline-block;
  width: 0px;
  min-width: 0px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.ag-layout-normal.ag-root {
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.ag-font-style {
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ag-popup-backdrop {
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}

.ag-header {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.ag-pinned-left-header {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  overflow: hidden;
}

.ag-pinned-right-header {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  overflow: hidden;
}

.ag-header-viewport {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  width: 0px;
  min-width: 0px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.ag-header-row {
  position: absolute;
}

.ag-header-container {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  white-space: nowrap;
}

.ag-header-overlay {
  display: block;
  position: absolute;
}

.ag-header-cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  position: absolute;
  vertical-align: bottom;
}

.ag-floating-filter {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
}

.ag-floating-filter-body {
  height: 20px;
  margin-right: 25px;
}

.ag-floating-filter-full-body {
  height: 20px;
  width: 100%;
}

.ag-floating-filter-input {
  width: 100%;
}

.ag-floating-filter-input:-moz-read-only {
  background-color: #eee;
}

.ag-floating-filter-input:read-only {
  background-color: #eee;
}

.ag-floating-filter-menu {
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ag-dnd-ghost {
  background: #e5e5e5;
  border: 1px solid black;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: move;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  overflow: hidden;
  padding: 3px;
  position: absolute;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ag-dnd-ghost-icon {
  display: inline-block;
  float: left;
  padding: 2px;
}

.ag-dnd-ghost-label {
  display: inline-block;
}

.ag-header-group-cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
}

.ag-header-group-cell-label {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.ag-header-cell-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.ag-header-cell-resize {
  cursor: col-resize;
  height: 100%;
  width: 4px;
}

.ag-ltr .ag-header-cell-resize {
  float: right;
}

.ag-ltr .ag-pinned-right-header .ag-header-cell-resize {
  float: left;
}

.ag-rtl .ag-header-cell-resize {
  float: left;
}

.ag-rtl .ag-pinned-left-header .ag-header-cell-resize {
  float: right;
}

.ag-ltr .ag-header-select-all {
  float: left;
}

.ag-rtl .ag-header-select-all {
  float: right;
}

.ag-header-expand-icon {
  padding-left: 4px;
}

.ag-header-cell-menu-button {
  float: right;
}

.ag-overlay {
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.ag-overlay-panel {
  display: table;
  height: 100%;
  pointer-events: none;
  width: 100%;
}

.ag-overlay-wrapper {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.ag-column-panel {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow-y: auto;
}

.ag-column-panel-center {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 400px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow-x: hidden;
  max-height: 100vh;
}

.ag-layout-auto-height.ag-body-container {
  min-height: 50px;
}

.ag-layout-auto-height.ag-overlay-no-rows-wrapper {
  padding-top: 30px;
}

.ag-body {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
}

.ag-layout-normal.ag-body {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: 0px;
  min-height: 0px;
}

.ag-rtl .ag-body {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
}

.ag-ltr .ag-body {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.ag-rtl .ag-floating-top {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
}

.ag-ltr .ag-floating-top {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.ag-ltr .ag-header {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.ag-rtl .ag-header {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
}

.ag-floating-top {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.ag-pinned-left-floating-top {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  position: relative;
}

.ag-pinned-right-floating-top {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  position: relative;
}

.ag-floating-top-viewport {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  width: 0px;
  min-width: 0px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.ag-layout-normal.ag-floating-top-viewport {
  height: 100%;
}

.ag-floating-top-container {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  white-space: nowrap;
}

.ag-floating-bottom {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.ag-pinned-left-floating-bottom {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  position: relative;
}

.ag-pinned-right-floating-bottom {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  position: relative;
}

.ag-floating-bottom-viewport {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 0px;
  min-width: 0px;
}

.ag-floating-bottom-container {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  white-space: nowrap;
}

.ag-pinned-left-cols-container {
  display: inline-block;
  position: relative;
}

.ag-pinned-right-cols-viewport {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.ag-pinned-left-cols-viewport {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.ag-pinned-right-cols-container {
  display: inline-block;
  position: relative;
}

.ag-pinned-left-cols-viewport-wrapper {
  height: 100%;
  overflow: hidden;
}

.ag-body-viewport-wrapper {
  height: 100%;
  width: 0px;
  min-width: 0px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
}

.ag-body-viewport {
  overflow-x: auto;
  overflow-y: auto;
}

.ag-layout-normal.ag-body-viewport {
  height: 100%;
}

.ag-full-width-viewport-wrapper {
  height: 100%;
  width: 100%;
  display: inline-block;
  pointer-events: none;
  overflow: hidden;
  position: absolute;
  top: 0px;
  left: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.ag-full-width-viewport {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  overflow-x: hidden;
  overflow-y: auto;
}

.ag-full-width-container {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.ag-floating-bottom-full-width-container {
  display: inline;
  height: 100%;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.ag-floating-top-full-width-container {
  display: inline;
  height: 100%;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.ag-full-width-row {
  overflow: hidden;
  pointer-events: all;
}

.ag-body-container {
  display: inline-block;
  margin-bottom: -2px;
  position: relative;
}

.ag-row-animation .ag-row {
  -webkit-transition: top 0.4s, height 0.4s, background-color 0.1s, opacity 0.2s, -webkit-transform 0.4s;
  transition: top 0.4s, height 0.4s, background-color 0.1s, opacity 0.2s, -webkit-transform 0.4s;
  transition: transform 0.4s, top 0.4s, height 0.4s, background-color 0.1s, opacity 0.2s;
  transition: transform 0.4s, top 0.4s, height 0.4s, background-color 0.1s, opacity 0.2s, -webkit-transform 0.4s;
}

.ag-row-no-animation .ag-row {
  -webkit-transition: background-color 0.1s;
  transition: background-color 0.1s;
}

.ag-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  white-space: nowrap;
  width: 100%;
}

.ag-column-moving .ag-cell {
  -webkit-transition: left 0.2s;
  transition: left 0.2s;
}

.ag-column-moving .ag-header-cell {
  -webkit-transition: left 0.2s;
  transition: left 0.2s;
}

.ag-column-moving .ag-header-group-cell {
  -webkit-transition: left 0.2s, width 0.2s;
  transition: left 0.2s, width 0.2s;
}

.ag-column-drop {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
}

.ag-column-drop-vertical {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 50px;
  overflow: hidden;
}

.ag-column-drop-vertical .ag-column-drop-list {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 20px;
  overflow-x: auto;
}

.ag-column-drop-vertical .ag-column-drop-cell {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.ag-column-drop-vertical .ag-column-drop-cell .ag-column-drop-cell-text {
  overflow: hidden;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ag-column-drop-vertical .ag-column-drop-empty-message {
  display: block;
}

.ag-column-drop-vertical .ag-column-drop-cell-button {
  line-height: 16px;
}

.ag-ltr .ag-column-drop-vertical .ag-column-drop-cell-button {
  float: right;
}

.ag-rtl .ag-column-drop-vertical .ag-column-drop-cell-button {
  float: left;
}

.ag-column-drop-horizontal {
  white-space: nowrap;
  overflow: hidden;
}

.ag-column-drop-horizontal .ag-column-drop-cell {
  display: inline-block;
}

.ag-column-drop-horizontal .ag-column-drop-empty-message {
  display: inline-block;
}

.ag-column-drop-horizontal .ag-column-drop-list {
  height: 100%;
}

.ag-cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ag-cell-with-height {
  height: 100%;
}

.ag-value-slide-out {
  margin-right: 5px;
  opacity: 1;
  -webkit-transition: opacity 3s, margin-right 3s;
  transition: opacity 3s, margin-right 3s;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}

.ag-value-slide-out-end {
  margin-right: 10px;
  opacity: 0;
}

.ag-opacity-zero {
  opacity: 0;
}

.ag-cell-edit-input {
  height: 100%;
  width: 100%;
}

.ag-group-cell-entire-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.ag-footer-cell-entire-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.ag-popup-editor {
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ag-menu {
  max-height: 100%;
  overflow-y: auto;
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ag-menu-column-select-wrapper {
  height: 300px;
  overflow: auto;
  width: 200px;
}

.ag-menu-list {
  border-collapse: collapse;
  display: table;
}

.ag-menu-option {
  display: table-row;
}

.ag-menu-option-text {
  display: table-cell;
}

.ag-menu-option-shortcut {
  display: table-cell;
}

.ag-menu-option-icon {
  display: table-cell;
}

.ag-menu-option-popup-pointer {
  display: table-cell;
}

.ag-menu-separator {
  display: table-row;
}

.ag-menu-separator-cell {
  display: table-cell;
}

.ag-virtual-list-viewport {
  height: 100%;
  overflow-x: auto;
  width: 100%;
}

.ag-virtual-list-container {
  overflow: hidden;
  position: relative;
}

.ag-rich-select {
  cursor: default;
  outline: none;
}

.ag-rich-select-row {
  white-space: nowrap;
}

.ag-rich-select-list {
  height: 200px;
  width: 200px;
}

.ag-set-filter-list {
  height: 200px;
  width: 200px;
}

.ag-set-filter-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ag-virtual-list-item {
  position: absolute;
  width: 100%;
}

.ag-virtual-list-item span:empty:not(.ag-icon) {
  border-left: 1px solid transparent;
}

.ag-filter-filter {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
}

.ag-floating-filter-body input {
  height: 19px;
  margin: 0;
  width: 100%;
}

.ag-floating-filter-full-body input {
  height: 19px;
  margin: 0;
  width: 100%;
}

.ag-filter-select {
  margin: 4px 4px 0 4px;
  width: 110px;
}

.ag-list-selection {
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ag-column-panel {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 200px;
}

.ag-column-container {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 50px;
  overflow: auto;
}

.ag-column-select-indent {
  display: inline-block;
}

.ag-ltr .ag-column-select-column {
  margin-left: 16px;
}

.ag-rtl .ag-column-select-column {
  margin-right: 16px;
}

.ag-column-select-column,
.ag-column-select-column-group {
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ag-column-select-column .ag-column-select-label,
.ag-column-select-column .ag-column-select-column-group-label,
.ag-column-select-column-group .ag-column-select-label,
.ag-column-select-column-group .ag-column-select-column-group-label {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ag-column-select-column .ag-column-drag,
.ag-column-select-column-group .ag-column-drag {
  min-width: 16px;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.ag-column-select-panel {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
}

.ag-tool-panel .ag-column-select-panel {
  -webkit-box-flex: 4;
  -ms-flex-positive: 4;
  flex-grow: 4;
}

.ag-tool-panel-horizontal-resize {
  cursor: col-resize;
  height: 100%;
  position: absolute;
  top: 0;
  width: 5px;
  z-index: 1;
}

.ag-rtl .ag-tool-panel-horizontal-resize {
  float: right;
  -webkit-transform: translateX(3px);
  transform: translateX(3px);
}

.ag-ltr .ag-tool-panel-horizontal-resize {
  float: left;
  -webkit-transform: translateX(-3px);
  transform: translateX(-3px);
}

.ag-menu-column-select-wrapper .ag-column-select-panel {
  height: 100%;
}

.ag-hidden {
  display: none !important;
}

.ag-visibility-hidden {
  visibility: hidden !important;
}

.ag-faded {
  opacity: 0.3;
}

.ag-width-half {
  display: inline-block;
  width: 50%;
}

.ag-shake-left-to-right {
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: ag-shake-left-to-right;
  animation-name: ag-shake-left-to-right;
}

@-webkit-keyframes ag-shake-left-to-right {
  from {
    padding-left: 6px;
    padding-right: 2px;
  }
  to {
    padding-left: 2px;
    padding-right: 6px;
  }
}

@keyframes ag-shake-left-to-right {
  from {
    padding-left: 6px;
    padding-right: 2px;
  }
  to {
    padding-left: 2px;
    padding-right: 6px;
  }
}

/* icons are used outside of the grid root (in the ghost) */

.ag-icon-aggregation {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOS41IDIuNWgtNmwyIDMuNS0yIDMuNWg2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iIzAwMCIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-arrows {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgNmwtMS40MSAxLjQxTDE2LjE3IDlINHYyaDEyLjE3bC0xLjU4IDEuNTlMMTYgMTRsNC00eiIvPjxwYXRoIGQ9Ik00IDZsMS40MSAxLjQxTDMuODMgOUgxNnYySDMuODNsMS41OCAxLjU5TDQgMTRsLTQtNHoiLz48cGF0aCBkPSJNNiAxNmwxLjQxLTEuNDFMOSAxNi4xN1Y0aDJ2MTIuMTdsMS41OS0xLjU4TDE0IDE2bC00IDR6Ii8+PHBhdGggZD0iTTE0IDRsLTEuNDEgMS40MUwxMSAzLjgzVjE2SDlWMy44M0w3LjQxIDUuNDEgNiA0bDQtNHoiLz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-asc {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDNoMnY5SDV6Ii8+PHBhdGggZD0iTTguOTkzIDUuMlYzLjQ5M2gtNnY2SDQuN1Y1LjJoNC4yOTN6IiBpZD0iYiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik01LjUgMy41aDF2OGgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSA1Ljk5MyA2LjQ5MykiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2IiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik04LjQ5MyA0Ljd2LS43MDdoLTV2NUg0LjJWNC43aDQuMjkzeiIvPjwvZz48L2c+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-checkbox-checked-readonly {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik05IDNMNiA4LjVsLTIuNS0yIi8+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-checkbox-checked {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik05IDNMNiA4LjVsLTIuNS0yIi8+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-checkbox-indeterminate-readonly {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNCA1aDR2Mkg0eiIvPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-checkbox-indeterminate {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNCA1aDR2Mkg0eiIvPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-checkbox-unchecked-readonly {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48L2c+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-checkbox-unchecked {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48L2c+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-column {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDR2Mkgxem0wIDNoNHY3SDF6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-columns {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDR2Mkgxem02IDBoNHYySDd6TTEgNWg0djJIMXptNiAwaDR2Mkg3ek0xIDloNHYySDF6bTYgMGg0djJIN3oiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-contracted {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMDAwIiB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNOSA1djJIM1Y1eiIvPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-copy {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTQuNSA0LjVoNXY1aC01eiIvPjxwYXRoIGQ9Ik03LjUgMi41aC01djVoMnYyaDV2LTVoLTJ2LTJ6Ii8+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-cut {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTMgMy4xMmMuNjY3LjA3OCAzIDEuNzQ1IDcgNS0uMzI2LjIwNC0uNjU5LjIwNC0xIDAtLjM0MS0uMjA2LTEuNjc0LTEuMjA2LTQtMyAwIC42NjYtLjY2Ny42NjYtMiAwLTItMS0xLTIuMTIgMC0yeiIvPjxwYXRoIGQ9Ik0zIDguMjY0Yy42NjctLjA4IDMtMS43NDYgNy01LS4zMjYtLjIwNS0uNjU5LS4yMDUtMSAwLS4zNDEuMjA0LTEuNjc0IDEuMjA0LTQgMyAwLS42NjctLjY2Ny0uNjY3LTIgMC0yIDEtMSAyLjExOSAwIDJ6Ii8+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-desc {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDJoMnY5SDV6Ii8+PHBhdGggZD0iTTguOTkzIDYuMVY0LjM5M2gtNnY2SDQuN1Y2LjFoNC4yOTN6IiBpZD0iYiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik01LjUgMi41aDF2OGgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTM1IDUuOTkzIDcuMzkzKSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYiIvPjxwYXRoIHN0cm9rZT0iIzAwMCIgZD0iTTguNDkzIDUuNnYtLjcwN2gtNXY1SDQuMlY1LjZoNC4yOTN6Ii8+PC9nPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-expanded {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMDAwIiB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNSAzaDJ2Nkg1eiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik05IDV2MkgzVjV6Ii8+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-eye-slash {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zLjAwMSAzLjkwOEwzIDRhMyAzIDAgMSAwIDUuOTk5LS4wOTJBNS4yNDggNS4yNDggMCAwIDAgNiAzYy0xLjEgMC0yLjEuMzAzLTIuOTk5LjkwOHoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNNCA0LjVjLjY2Ny0uMzMzIDEuNjY3LS41IDMtLjUiIHN0cm9rZT0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik0xIDZjMS4zMzMtMiAzLTMgNS0zczMuNjY3IDEgNSAzQzkuNjY3IDggOCA5IDYgOVMyLjMzMyA4IDEgNnoiIHN0cm9rZT0iIzAwMCIvPjxwYXRoIGQ9Ik00LjAwNCAyLjgzNWw0Ljk5MiA2LjMzIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiLz48cGF0aCBkPSJNMy4wMDQgMi44MzVsNC45OTIgNi4zMyIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIi8+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-eye {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zLjAwMSAzLjkwOEwzIDRhMyAzIDAgMSAwIDUuOTk5LS4wOTJBNS4yNDggNS4yNDggMCAwIDAgNiAzYy0xLjEgMC0yLjEuMzAzLTIuOTk5LjkwOHoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNNCA0LjVjLjY2Ny0uMzMzIDEuNjY3LS41IDMtLjUiIHN0cm9rZT0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik0xIDZjMS4zMzMtMiAzLTMgNS0zczMuNjY3IDEgNSAzQzkuNjY3IDggOCA5IDYgOVMyLjMzMyA4IDEgNnoiIHN0cm9rZT0iIzAwMCIvPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-filter {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAyaDEwTDcgNnY1TDUgOVY2TDEgMnptNCA0djFoMlY2SDV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-group {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIHN0cm9rZT0iIzAwMCIgZD0iTTcuNSAxLjVoM3YyaC0zem0wIDRoM3YyaC0zem0wIDRoM3YyaC0zeiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yIDNoMXY4SDJ6bTEgM2g0djFIM3ptMi00aDN2MUg1eiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yIDEwaDV2MUgyeiIvPjxwYXRoIHN0cm9rZT0iIzAwMCIgZD0iTTEuNSAxLjVoM3YyaC0zeiIvPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-indeterminate {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zLjA1NiA0LjU4MWEzLjAwMSAzLjAwMSAwIDAgMCA1Ljg4OCAwQzguMDU5IDQuMTk0IDcuMDc4IDQgNiA0Yy0xLjA3OCAwLTIuMDYuMTk0LTIuOTQ0LjU4MXoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNNCA1LjVjLjY2Ny0uMzMzIDEuNjY3LS41IDMtLjUiIHN0cm9rZT0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik0xIDZjMS4zMzMtMS4zMzMgMy0yIDUtMnMzLjY2Ny42NjcgNSAyQzkuNjY3IDcuMzMzIDggOCA2IDhzLTMuNjY3LS42NjctNS0yeiIgc3Ryb2tlPSIjMDAwIi8+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-left {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNNy45OTMgNC43VjIuOTkzaC02djZIMy43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNi41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBkPSJNNiAyaDF2OEg2eiIvPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgNC45OTMgNS45OTMpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBkPSJNNy40OTMgNC4ydi0uNzA3aC01djVIMy4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-loading {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDFoMnYzSDV6Ii8+PHBhdGggaWQ9ImIiIGQ9Ik01IDhoMnYzSDV6Ii8+PHBhdGggaWQ9ImMiIGQ9Ik0xIDVoM3YySDF6Ii8+PHBhdGggaWQ9ImQiIGQ9Ik04IDVoM3YySDh6Ii8+PHBhdGggaWQ9ImUiIGQ9Ik00IDBoMnYzSDR6Ii8+PHBhdGggaWQ9ImYiIGQ9Ik00IDdoMnYzSDR6Ii8+PHBhdGggaWQ9ImciIGQ9Ik0wIDRoM3YySDB6Ii8+PHBhdGggaWQ9ImgiIGQ9Ik03IDRoM3YySDd6Ii8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYSIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTUuNSAxLjVoMXYyaC0xeiIvPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2IiLz48cGF0aCBzdHJva2U9IiM5Nzk3OTciIGQ9Ik01LjUgOC41aDF2MmgtMXoiLz48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNjIi8+PHBhdGggc3Ryb2tlPSIjOTc5Nzk3IiBkPSJNMS41IDUuNWgydjFoLTJ6Ii8+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjZCIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTguNSA1LjVoMnYxaC0yeiIvPjxnIG9wYWNpdHk9Ii43MTQiPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDQuMjkzIDYuNzA3KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjZSIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTQuNS41aDF2MmgtMXoiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNC4yOTMgNi43MDcpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNmIi8+PHBhdGggc3Ryb2tlPSIjOTc5Nzk3IiBkPSJNNC41IDcuNWgxdjJoLTF6Ii8+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDQuMjkzIDYuNzA3KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjZyIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTS41IDQuNWgydjFoLTJ6Ii8+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDQuMjkzIDYuNzA3KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjaCIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTcuNSA0LjVoMnYxaC0yeiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-menu {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDEwdjJIMXptMCA0aDEwdjJIMXptMCA0aDEwdjJIMXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-minus {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDh2MkgyeiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-none {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDNoMnY2SDV6Ii8+PHBhdGggZD0iTTguMTQ2IDguMTgyVjYuNDc1aC01djVoMS43MDhWOC4xODJoMy4yOTJ6IiBpZD0iYiIvPjxwYXRoIGQ9Ik04LjUgMi45MTRWMS4yMDdoLTV2NWgxLjcwN1YyLjkxNEg4LjV6IiBpZD0iYyIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik01LjUgMy41aDF2NWgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTM1IDUuNjQ2IDguNDc1KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYiIvPjxwYXRoIHN0cm9rZT0iIzAwMCIgZD0iTTcuNjQ2IDcuNjgydi0uNzA3aC00djRoLjcwOFY3LjY4MmgzLjI5MnoiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNiAzLjcwNykiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2MiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik04IDIuNDE0di0uNzA3SDR2NGguNzA3VjIuNDE0SDh6Ii8+PC9nPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-not-allowed {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjQiLz48cGF0aCBkPSJNOC41IDMuNUwzLjQwMSA4LjU5OSIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIvPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-paste {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTIuNSAyLjVoN3Y3aC03eiIvPjxwYXRoIGQ9Ik02LjUgMS41aC0xdjJoLTF2MWgzdi0xaC0xdi0yeiIvPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-pin {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0zIDJoNnYxSDh2NGwyIDFIN2wtMSAzLTEtM0gybDItMVYzSDN6Ii8+PHBhdGggZmlsbC1vcGFjaXR5PSIuNSIgZmlsbD0iI0ZGRiIgZD0iTTUgM2gxdjRINXoiLz48cGF0aCBmaWxsLW9wYWNpdHk9Ii4yOCIgZmlsbD0iI0ZGRiIgZD0iTTQgM2gxdjNINHoiLz48L2c+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-pivot {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHJlY3QgeD0iMS41IiB5PSIxLjUiIHdpZHRoPSI5IiBoZWlnaHQ9IjkiIHJ4PSIxIi8+PHBhdGggZD0iTTEwLjUgMy41aC05bTItMnY5IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIi8+PHBhdGggZD0iTTcuNSA2LjVsMS0xIDEgMW0tMyAxbC0xIDEgMSAxIi8+PHBhdGggZD0iTTguNSA1LjV2M2gtMyIvPjwvZz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-plus {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01IDJoMnY4SDV6Ii8+PHBhdGggZD0iTTIgNWg4djJIMnoiLz48L2c+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-right {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik00LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNOS45OTMgNC43VjIuOTkzaC02djZINS43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNS41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBkPSJNNSAyaDF2OEg1eiIvPjwvZz48ZyB0cmFuc2Zvcm09InNjYWxlKC0xIDEpIHJvdGF0ZSgtNDUgMCAyMi44NzQpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBkPSJNOS40OTMgNC4ydi0uNzA3aC01djVINS4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-small-left {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA2bDQtNHY4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-small-right {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSAybDQgNC00IDR6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-small-up {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA3bDQtNCA0IDR6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-small-down {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDhMNiA5eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-tick {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS41IDUuNWwzIDMgNi02IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iIzAwMCIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-cross {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiAxMGw4LThtMCA4TDIgMiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-tree-open {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDhMNiA5eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-tree-closed {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSAybDQgNC00IDR6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.ag-icon-tree-indeterminate {
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDh2MkgyeiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) center no-repeat;
  background-size: 12px 12px;
  -webkit-filter: "initial";
  filter: "initial";
  height: 12px;
  width: 12px;
}

.loading-filter {
  background-color: #e6e6e6;
  height: 100%;
  padding: 5px;
  position: absolute;
  top: 34px;
  width: 100%;
  z-index: 1;
}

.ag-details-row {
  height: 100%;
  width: 100%;
}

.ag-details-grid {
  height: 100%;
  width: 100%;
}

.ag-column-select-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.ag-ltr .ag-toolpanel-indent-1 {
  padding-left: 10px;
}

.ag-rtl .ag-toolpanel-indent-1 {
  padding-right: 10px;
}

.ag-ltr .ag-row-group-indent-1 {
  padding-left: 10px;
}

.ag-rtl .ag-row-group-indent-1 {
  padding-right: 10px;
}

.ag-ltr .ag-toolpanel-indent-2 {
  padding-left: 20px;
}

.ag-rtl .ag-toolpanel-indent-2 {
  padding-right: 20px;
}

.ag-ltr .ag-row-group-indent-2 {
  padding-left: 20px;
}

.ag-rtl .ag-row-group-indent-2 {
  padding-right: 20px;
}

.ag-ltr .ag-toolpanel-indent-3 {
  padding-left: 30px;
}

.ag-rtl .ag-toolpanel-indent-3 {
  padding-right: 30px;
}

.ag-ltr .ag-row-group-indent-3 {
  padding-left: 30px;
}

.ag-rtl .ag-row-group-indent-3 {
  padding-right: 30px;
}

.ag-ltr .ag-toolpanel-indent-4 {
  padding-left: 40px;
}

.ag-rtl .ag-toolpanel-indent-4 {
  padding-right: 40px;
}

.ag-ltr .ag-row-group-indent-4 {
  padding-left: 40px;
}

.ag-rtl .ag-row-group-indent-4 {
  padding-right: 40px;
}

.ag-ltr .ag-toolpanel-indent-5 {
  padding-left: 50px;
}

.ag-rtl .ag-toolpanel-indent-5 {
  padding-right: 50px;
}

.ag-ltr .ag-row-group-indent-5 {
  padding-left: 50px;
}

.ag-rtl .ag-row-group-indent-5 {
  padding-right: 50px;
}

.ag-ltr .ag-toolpanel-indent-6 {
  padding-left: 60px;
}

.ag-rtl .ag-toolpanel-indent-6 {
  padding-right: 60px;
}

.ag-ltr .ag-row-group-indent-6 {
  padding-left: 60px;
}

.ag-rtl .ag-row-group-indent-6 {
  padding-right: 60px;
}

.ag-ltr .ag-toolpanel-indent-7 {
  padding-left: 70px;
}

.ag-rtl .ag-toolpanel-indent-7 {
  padding-right: 70px;
}

.ag-ltr .ag-row-group-indent-7 {
  padding-left: 70px;
}

.ag-rtl .ag-row-group-indent-7 {
  padding-right: 70px;
}

.ag-ltr .ag-toolpanel-indent-8 {
  padding-left: 80px;
}

.ag-rtl .ag-toolpanel-indent-8 {
  padding-right: 80px;
}

.ag-ltr .ag-row-group-indent-8 {
  padding-left: 80px;
}

.ag-rtl .ag-row-group-indent-8 {
  padding-right: 80px;
}

.ag-ltr .ag-toolpanel-indent-9 {
  padding-left: 90px;
}

.ag-rtl .ag-toolpanel-indent-9 {
  padding-right: 90px;
}

.ag-ltr .ag-row-group-indent-9 {
  padding-left: 90px;
}

.ag-rtl .ag-row-group-indent-9 {
  padding-right: 90px;
}

.ag-ltr .ag-toolpanel-indent-10 {
  padding-left: 100px;
}

.ag-rtl .ag-toolpanel-indent-10 {
  padding-right: 100px;
}

.ag-ltr .ag-row-group-indent-10 {
  padding-left: 100px;
}

.ag-rtl .ag-row-group-indent-10 {
  padding-right: 100px;
}

.ag-ltr .ag-toolpanel-indent-11 {
  padding-left: 110px;
}

.ag-rtl .ag-toolpanel-indent-11 {
  padding-right: 110px;
}

.ag-ltr .ag-row-group-indent-11 {
  padding-left: 110px;
}

.ag-rtl .ag-row-group-indent-11 {
  padding-right: 110px;
}

.ag-ltr .ag-toolpanel-indent-12 {
  padding-left: 120px;
}

.ag-rtl .ag-toolpanel-indent-12 {
  padding-right: 120px;
}

.ag-ltr .ag-row-group-indent-12 {
  padding-left: 120px;
}

.ag-rtl .ag-row-group-indent-12 {
  padding-right: 120px;
}

.ag-ltr .ag-toolpanel-indent-13 {
  padding-left: 130px;
}

.ag-rtl .ag-toolpanel-indent-13 {
  padding-right: 130px;
}

.ag-ltr .ag-row-group-indent-13 {
  padding-left: 130px;
}

.ag-rtl .ag-row-group-indent-13 {
  padding-right: 130px;
}

.ag-ltr .ag-toolpanel-indent-14 {
  padding-left: 140px;
}

.ag-rtl .ag-toolpanel-indent-14 {
  padding-right: 140px;
}

.ag-ltr .ag-row-group-indent-14 {
  padding-left: 140px;
}

.ag-rtl .ag-row-group-indent-14 {
  padding-right: 140px;
}

.ag-ltr .ag-toolpanel-indent-15 {
  padding-left: 150px;
}

.ag-rtl .ag-toolpanel-indent-15 {
  padding-right: 150px;
}

.ag-ltr .ag-row-group-indent-15 {
  padding-left: 150px;
}

.ag-rtl .ag-row-group-indent-15 {
  padding-right: 150px;
}

.ag-ltr .ag-toolpanel-indent-16 {
  padding-left: 160px;
}

.ag-rtl .ag-toolpanel-indent-16 {
  padding-right: 160px;
}

.ag-ltr .ag-row-group-indent-16 {
  padding-left: 160px;
}

.ag-rtl .ag-row-group-indent-16 {
  padding-right: 160px;
}

.ag-ltr .ag-toolpanel-indent-17 {
  padding-left: 170px;
}

.ag-rtl .ag-toolpanel-indent-17 {
  padding-right: 170px;
}

.ag-ltr .ag-row-group-indent-17 {
  padding-left: 170px;
}

.ag-rtl .ag-row-group-indent-17 {
  padding-right: 170px;
}

.ag-ltr .ag-toolpanel-indent-18 {
  padding-left: 180px;
}

.ag-rtl .ag-toolpanel-indent-18 {
  padding-right: 180px;
}

.ag-ltr .ag-row-group-indent-18 {
  padding-left: 180px;
}

.ag-rtl .ag-row-group-indent-18 {
  padding-right: 180px;
}

.ag-ltr .ag-toolpanel-indent-19 {
  padding-left: 190px;
}

.ag-rtl .ag-toolpanel-indent-19 {
  padding-right: 190px;
}

.ag-ltr .ag-row-group-indent-19 {
  padding-left: 190px;
}

.ag-rtl .ag-row-group-indent-19 {
  padding-right: 190px;
}

.ag-ltr .ag-toolpanel-indent-20 {
  padding-left: 200px;
}

.ag-rtl .ag-toolpanel-indent-20 {
  padding-right: 200px;
}

.ag-ltr .ag-row-group-indent-20 {
  padding-left: 200px;
}

.ag-rtl .ag-row-group-indent-20 {
  padding-right: 200px;
}

.ag-ltr .ag-toolpanel-indent-21 {
  padding-left: 210px;
}

.ag-rtl .ag-toolpanel-indent-21 {
  padding-right: 210px;
}

.ag-ltr .ag-row-group-indent-21 {
  padding-left: 210px;
}

.ag-rtl .ag-row-group-indent-21 {
  padding-right: 210px;
}

.ag-ltr .ag-toolpanel-indent-22 {
  padding-left: 220px;
}

.ag-rtl .ag-toolpanel-indent-22 {
  padding-right: 220px;
}

.ag-ltr .ag-row-group-indent-22 {
  padding-left: 220px;
}

.ag-rtl .ag-row-group-indent-22 {
  padding-right: 220px;
}

.ag-ltr .ag-toolpanel-indent-23 {
  padding-left: 230px;
}

.ag-rtl .ag-toolpanel-indent-23 {
  padding-right: 230px;
}

.ag-ltr .ag-row-group-indent-23 {
  padding-left: 230px;
}

.ag-rtl .ag-row-group-indent-23 {
  padding-right: 230px;
}

.ag-ltr .ag-toolpanel-indent-24 {
  padding-left: 240px;
}

.ag-rtl .ag-toolpanel-indent-24 {
  padding-right: 240px;
}

.ag-ltr .ag-row-group-indent-24 {
  padding-left: 240px;
}

.ag-rtl .ag-row-group-indent-24 {
  padding-right: 240px;
}

.ag-ltr .ag-toolpanel-indent-25 {
  padding-left: 250px;
}

.ag-rtl .ag-toolpanel-indent-25 {
  padding-right: 250px;
}

.ag-ltr .ag-row-group-indent-25 {
  padding-left: 250px;
}

.ag-rtl .ag-row-group-indent-25 {
  padding-right: 250px;
}

.ag-ltr .ag-toolpanel-indent-26 {
  padding-left: 260px;
}

.ag-rtl .ag-toolpanel-indent-26 {
  padding-right: 260px;
}

.ag-ltr .ag-row-group-indent-26 {
  padding-left: 260px;
}

.ag-rtl .ag-row-group-indent-26 {
  padding-right: 260px;
}

.ag-ltr .ag-toolpanel-indent-27 {
  padding-left: 270px;
}

.ag-rtl .ag-toolpanel-indent-27 {
  padding-right: 270px;
}

.ag-ltr .ag-row-group-indent-27 {
  padding-left: 270px;
}

.ag-rtl .ag-row-group-indent-27 {
  padding-right: 270px;
}

.ag-ltr .ag-toolpanel-indent-28 {
  padding-left: 280px;
}

.ag-rtl .ag-toolpanel-indent-28 {
  padding-right: 280px;
}

.ag-ltr .ag-row-group-indent-28 {
  padding-left: 280px;
}

.ag-rtl .ag-row-group-indent-28 {
  padding-right: 280px;
}

.ag-ltr .ag-toolpanel-indent-29 {
  padding-left: 290px;
}

.ag-rtl .ag-toolpanel-indent-29 {
  padding-right: 290px;
}

.ag-ltr .ag-row-group-indent-29 {
  padding-left: 290px;
}

.ag-rtl .ag-row-group-indent-29 {
  padding-right: 290px;
}

.ag-ltr .ag-toolpanel-indent-30 {
  padding-left: 300px;
}

.ag-rtl .ag-toolpanel-indent-30 {
  padding-right: 300px;
}

.ag-ltr .ag-row-group-indent-30 {
  padding-left: 300px;
}

.ag-rtl .ag-row-group-indent-30 {
  padding-right: 300px;
}

.ag-ltr .ag-toolpanel-indent-31 {
  padding-left: 310px;
}

.ag-rtl .ag-toolpanel-indent-31 {
  padding-right: 310px;
}

.ag-ltr .ag-row-group-indent-31 {
  padding-left: 310px;
}

.ag-rtl .ag-row-group-indent-31 {
  padding-right: 310px;
}

.ag-ltr .ag-toolpanel-indent-32 {
  padding-left: 320px;
}

.ag-rtl .ag-toolpanel-indent-32 {
  padding-right: 320px;
}

.ag-ltr .ag-row-group-indent-32 {
  padding-left: 320px;
}

.ag-rtl .ag-row-group-indent-32 {
  padding-right: 320px;
}

.ag-ltr .ag-toolpanel-indent-33 {
  padding-left: 330px;
}

.ag-rtl .ag-toolpanel-indent-33 {
  padding-right: 330px;
}

.ag-ltr .ag-row-group-indent-33 {
  padding-left: 330px;
}

.ag-rtl .ag-row-group-indent-33 {
  padding-right: 330px;
}

.ag-ltr .ag-toolpanel-indent-34 {
  padding-left: 340px;
}

.ag-rtl .ag-toolpanel-indent-34 {
  padding-right: 340px;
}

.ag-ltr .ag-row-group-indent-34 {
  padding-left: 340px;
}

.ag-rtl .ag-row-group-indent-34 {
  padding-right: 340px;
}

.ag-ltr .ag-toolpanel-indent-35 {
  padding-left: 350px;
}

.ag-rtl .ag-toolpanel-indent-35 {
  padding-right: 350px;
}

.ag-ltr .ag-row-group-indent-35 {
  padding-left: 350px;
}

.ag-rtl .ag-row-group-indent-35 {
  padding-right: 350px;
}

.ag-ltr .ag-toolpanel-indent-36 {
  padding-left: 360px;
}

.ag-rtl .ag-toolpanel-indent-36 {
  padding-right: 360px;
}

.ag-ltr .ag-row-group-indent-36 {
  padding-left: 360px;
}

.ag-rtl .ag-row-group-indent-36 {
  padding-right: 360px;
}

.ag-ltr .ag-toolpanel-indent-37 {
  padding-left: 370px;
}

.ag-rtl .ag-toolpanel-indent-37 {
  padding-right: 370px;
}

.ag-ltr .ag-row-group-indent-37 {
  padding-left: 370px;
}

.ag-rtl .ag-row-group-indent-37 {
  padding-right: 370px;
}

.ag-ltr .ag-toolpanel-indent-38 {
  padding-left: 380px;
}

.ag-rtl .ag-toolpanel-indent-38 {
  padding-right: 380px;
}

.ag-ltr .ag-row-group-indent-38 {
  padding-left: 380px;
}

.ag-rtl .ag-row-group-indent-38 {
  padding-right: 380px;
}

.ag-ltr .ag-toolpanel-indent-39 {
  padding-left: 390px;
}

.ag-rtl .ag-toolpanel-indent-39 {
  padding-right: 390px;
}

.ag-ltr .ag-row-group-indent-39 {
  padding-left: 390px;
}

.ag-rtl .ag-row-group-indent-39 {
  padding-right: 390px;
}

.ag-ltr .ag-toolpanel-indent-40 {
  padding-left: 400px;
}

.ag-rtl .ag-toolpanel-indent-40 {
  padding-right: 400px;
}

.ag-ltr .ag-row-group-indent-40 {
  padding-left: 400px;
}

.ag-rtl .ag-row-group-indent-40 {
  padding-right: 400px;
}

.ag-ltr .ag-toolpanel-indent-41 {
  padding-left: 410px;
}

.ag-rtl .ag-toolpanel-indent-41 {
  padding-right: 410px;
}

.ag-ltr .ag-row-group-indent-41 {
  padding-left: 410px;
}

.ag-rtl .ag-row-group-indent-41 {
  padding-right: 410px;
}

.ag-ltr .ag-toolpanel-indent-42 {
  padding-left: 420px;
}

.ag-rtl .ag-toolpanel-indent-42 {
  padding-right: 420px;
}

.ag-ltr .ag-row-group-indent-42 {
  padding-left: 420px;
}

.ag-rtl .ag-row-group-indent-42 {
  padding-right: 420px;
}

.ag-ltr .ag-toolpanel-indent-43 {
  padding-left: 430px;
}

.ag-rtl .ag-toolpanel-indent-43 {
  padding-right: 430px;
}

.ag-ltr .ag-row-group-indent-43 {
  padding-left: 430px;
}

.ag-rtl .ag-row-group-indent-43 {
  padding-right: 430px;
}

.ag-ltr .ag-toolpanel-indent-44 {
  padding-left: 440px;
}

.ag-rtl .ag-toolpanel-indent-44 {
  padding-right: 440px;
}

.ag-ltr .ag-row-group-indent-44 {
  padding-left: 440px;
}

.ag-rtl .ag-row-group-indent-44 {
  padding-right: 440px;
}

.ag-ltr .ag-toolpanel-indent-45 {
  padding-left: 450px;
}

.ag-rtl .ag-toolpanel-indent-45 {
  padding-right: 450px;
}

.ag-ltr .ag-row-group-indent-45 {
  padding-left: 450px;
}

.ag-rtl .ag-row-group-indent-45 {
  padding-right: 450px;
}

.ag-ltr .ag-toolpanel-indent-46 {
  padding-left: 460px;
}

.ag-rtl .ag-toolpanel-indent-46 {
  padding-right: 460px;
}

.ag-ltr .ag-row-group-indent-46 {
  padding-left: 460px;
}

.ag-rtl .ag-row-group-indent-46 {
  padding-right: 460px;
}

.ag-ltr .ag-toolpanel-indent-47 {
  padding-left: 470px;
}

.ag-rtl .ag-toolpanel-indent-47 {
  padding-right: 470px;
}

.ag-ltr .ag-row-group-indent-47 {
  padding-left: 470px;
}

.ag-rtl .ag-row-group-indent-47 {
  padding-right: 470px;
}

.ag-ltr .ag-toolpanel-indent-48 {
  padding-left: 480px;
}

.ag-rtl .ag-toolpanel-indent-48 {
  padding-right: 480px;
}

.ag-ltr .ag-row-group-indent-48 {
  padding-left: 480px;
}

.ag-rtl .ag-row-group-indent-48 {
  padding-right: 480px;
}

.ag-ltr .ag-toolpanel-indent-49 {
  padding-left: 490px;
}

.ag-rtl .ag-toolpanel-indent-49 {
  padding-right: 490px;
}

.ag-ltr .ag-row-group-indent-49 {
  padding-left: 490px;
}

.ag-rtl .ag-row-group-indent-49 {
  padding-right: 490px;
}

.ag-tool-panel {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.ag-tool-panel .ag-side-buttons {
  width: 20px;
}

.ag-tool-panel .ag-side-buttons button {
  display: block;
  -webkit-transform: rotate(90deg) translateY(-20px);
  transform: rotate(90deg) translateY(-20px);
  -webkit-transform-origin: left top 0;
  transform-origin: left top 0;
  white-space: nowrap;
  outline: none;
}

.ag-tool-panel .panel-container {
  width: 180px;
}

.ag-tool-panel.full-width .panel-container {
  width: 200px;
}

.ag-rtl .ag-tool-panel .ag-side-buttons button {
  -webkit-transform: rotate(-90deg) translatex(20px);
  transform: rotate(-90deg) translatex(20px);
  -webkit-transform-origin: right bottom 0;
  transform-origin: right bottom 0;
}

.ag-row-inline-editing {
  z-index: 1;
}

`;