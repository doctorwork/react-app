/* 阿拉伯数字转汉子数字
* @param {Number} 阿拉伯数值
*/

const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const chnUnitChar = ['', '十', '百', '千'];

export default function SectionToChinese(section) {
    let strIns = '',
        chnStr = '';
    let unitPos = 0;
    let zero = true;
    while (section > 0) {
        let v = section % 10;
        if (v === 0) {
            if (!zero) {
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        } else {
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
    }
    return chnStr;
}
