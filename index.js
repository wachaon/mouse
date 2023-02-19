const { readFileSync, existsFileSync } = require('filesystem')
const { resolve, basename, extname } = require('pathname')
const { execCommand } = require('utility')
const ps = require('ps')

// mouse
const mouse_cs = generate('src/mouse.cs', 3)
const mouse_exe = resolve(__dirname, 'mouse.exe')
const exists_mouse_exe = existsFileSync(mouse_exe)

// mouse method
function pos(x = 0, y = 0) {
    if (exists_mouse_exe) execCommand(`${mouse_exe} pos ${x} ${y}`)
    else ps(mouse_cs, ['pos', x, y])
}

function click() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} click`)
    else ps(mouse_cs, ['click', 0, 0])
}

function leftDown() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} leftDown`)
    else ps(mouse_cs, ['leftDown', 0, 0])
}

function leftUp() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} leftUp`)
    else ps(mouse_cs, ['leftUp', 0, 0])
}

function rightClick() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} rightClick`)
    else ps(mouse_cs, ['rightClick', 0, 0])
}

function rightDown() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} rightDown`)
    else ps(mouse_cs, ['rightDown', 0, 0])
}

function rightUp() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} rightUp`)
    else ps(mouse_cs, ['rightUp', 0, 0])
}

function scroll(movement = 0) {
    if (exists_mouse_exe) execCommand(`${mouse_exe} scroll ${movement}`)
    else ps(mouse_cs, ['scroll', movement, 0])
}

function generate(spec, len = 0) {
    const file = resolve(__dirname, spec)
    const program = basename(file, extname(file))
    const args = len ? (new Array(len)).fill(0).map((arg, i) => `$args[${i}]`).join(', ') : ''
    const source = readFileSync(file, 'auto')
    const code = `$Source = @"
${source}"@

Add-Type -Language CSharp -TypeDefinition $Source
[${program}]::Main(${args})`
    return code
}

module.exports = {
    pos,
    click,
    leftDown,
    leftUp,
    rightClick,
    rightDown,
    rightUp,
    scroll
}