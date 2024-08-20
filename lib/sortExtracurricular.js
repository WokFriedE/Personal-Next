export const sortPos = (aPos, bPos, rev = false) => {
    // If both current
    rev = rev ? -1 : 1;
    if (aPos.current && bPos.current && aPos.start > bPos.start) return 1 * rev;
    else if (bPos.current && aPos.current && bPos.start > aPos.start) return -1 * rev;
    // If one is current and one isn't
    else if (aPos.current && !bPos.current) return -1 * rev;
    else if (!aPos.current && bPos.current) return 1 * rev;
    // test end times (past)
    else if (aPos.end > bPos.end) return 1 * rev;
    else if (aPos.end < bPos.end) return -1 * rev;
    else return 0;
};

export default function sortExtracurricular(data) {
    // Handle Extracurricular data
    let extraData = [...data];

    // Sort positions for each org
    extraData.forEach((item, i) => {
        extraData[i].positions = item.positions.sort((a, b) => {
            return sortPos(a, b, true);
        });
    });
    // Sort each org so present is top
    extraData.sort((a, b) => {
        return sortPos(a.positions[0], b.positions[0], false);
    });

    return extraData;
}
