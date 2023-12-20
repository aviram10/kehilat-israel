const unit = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י'];
const tens = ['י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק'];
const hundreds = ['ק', 'ר', 'ש', 'ת'];

const list = [];
for (let i = 0; i < 1000; i++) {
    let str = '';
    if (i < 10) {
        str = unit[i];
    } else if (i < 100) {
        str = tens[Math.floor(i / 10) - 1] + (i % 10 === 0 ? '' : unit[i % 10 - 1]);
    } else {
        str = hundreds[Math.floor(i / 100) - 1] + (i % 100 === 0 ? '' : tens[Math.floor((i % 100) / 10) - 1] + (i % 10 === 0 ? '' : unit[i % 10 - 1]));
    }
    list.push(str);
}

console.log(list);

