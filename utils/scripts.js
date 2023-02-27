export function formataData(value) {
    const a = value.toString();
    const b = a.replaceAll('/','')
    const c = b.replace(',','')
    const d = c.replaceAll(':','')
    return d.replace(/\s/g,'')
    // const e = d.replace(':',' ')
    // const f = e.replace(':',' ')
    // return f.trim()
}