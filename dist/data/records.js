"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRecords(page, limit) {
    const numRecords = 100;
    let recordSet = new Set();
    for (let i = 0; i < numRecords; i++) {
        recordSet.add({
            id: i,
            name: `name ${numRecords - i}`,
            data: `data ${Math.random()}`,
        });
    }
    //   console.log(...recordSet);
    return Array.from(recordSet);
}
exports.default = getRecords;
//# sourceMappingURL=records.js.map