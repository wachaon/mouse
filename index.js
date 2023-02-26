const { existsFileSync } = require('filesystem')
const { resolve } = require('pathname')
const { execCommand } = require('utility')
const argv = require('argv')
const isCLI = require('isCLI')
const { execScript, compile } = require('csharpscript')

// mouse
const mouse_cs = resolve(__dirname, 'src/mouse.cs')
const mouse_exe = resolve(__dirname, 'mouse.exe')
const exists_mouse_exe = existsFileSync(mouse_exe)
const mouse = 'mouse'
const Main = 'Main'

// mouse method
function pos(x = 0, y = 0) {
    if (exists_mouse_exe) execCommand(`${mouse_exe} pos ${x} ${y}`)
    else execScript(mouse_cs, mouse, Main, 'pos', x, y)
}

function click() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} click`)
    else execScript(mouse_cs, mouse, Main, 'click', 0, 0)
}

function leftDown() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} leftDown`)
    else execScript(mouse_cs, mouse, Main, 'leftDown', 0, 0)
}

function leftUp() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} leftUp`)
    else execScript(mouse_cs, mouse, Main, 'leftUp', 0, 0)
}

function rightClick() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} rightClick`)
    else execScript(mouse_cs, mouse, Main, 'rightClick', 0, 0)
}

function rightDown() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} rightDown`)
    else execScript(mouse_cs, mouse, Main, 'rightDown', 0, 0)
}

function rightUp() {
    if (exists_mouse_exe) execCommand(`${mouse_exe} rightUp`)
    elseexecScript(mouse_cs, mouse, Main, 'rightUp', 0, 0)
}

function scroll(movement = 0) {
    if (exists_mouse_exe) execCommand(`${mouse_exe} scroll ${movement}`)
    else execScript(mouse_cs, mouse, Main, 'scroll', movement, 0)
}


if (isCLI(__filename)) {
    if (argv.get('c') || argv.get('compile') || argv.unnamed[1] === 'compile') compile(mouse_cs, { out: mouse_exe })
} else module.exports = {
    pos,
    click,
    leftDown,
    leftUp,
    rightClick,
    rightDown,
    rightUp,
    scroll
}