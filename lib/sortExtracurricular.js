const sortPos = (aPos, bPos) => {
    // If both current
    if (aPos.current && bPos.current && aPos.start > bPos.start) return 1;
    else if (bPos.current && aPos.current && bPos.start > aPos.start) return -1;
    // If one is current and one isn't
    else if (aPos.current && !bPos.current) return -1;
    else if (!aPos.current && bPos.current) return 1;
    // test end times (past)
    else if (aPos.end > bPos.end) return 1;
    else if (aPos.end < bPos.end) return -1;
    else return 0;
};

export default function sortExtracurricular(data) {
    // Handle Extracurricular data
    let extraData = [...data];

    // Sort positions for each org
    extraData.forEach((item, i) => {
        extraData[i].positions = item.positions.sort((a, b) => {
            return sortPos(a, b);
        });
    });
    // Sort each org so present is top
    extraData.sort((a, b) => {
        return sortPos(a.positions[0], b.positions[0]);
    });

    return extraData;
}
