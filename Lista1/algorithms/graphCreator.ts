import { CsvRow, NodeJR } from "../types";

export const createGraph = (data: CsvRow[]) => {
    const nodes: NodeJR[] = [];

    data.forEach((row) => nodes.push(createNode(row)));

    return nodes;
}

const createNode = (row: CsvRow):NodeJR => {
    return {
        name: row.start_stop,
        lat: parseFloat(row.start_stop_lat),
        lon: parseFloat(row.start_stop_lon),
    };
}