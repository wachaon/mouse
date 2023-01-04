const ps = require("ps")

const source = `
$Method = $args[0]
$PosX = $args[1]
$PosY = $args[2]

$assemblies = @("System", "System.Runtime.InteropServices")

$Source = @"
using System;
using System.Runtime.InteropServices;

namespace Device {
    public class Mouse {
        public static void Main (params string[] args) {
            string method = args[0];
            int posX = args.Length > 1 ? Int32.Parse(args[1]) : 0;
            int posY = args.Length > 2 ? Int32.Parse(args[2]) : 0;

            if (method == "pos") {
                SetCursorPos(posX, posY);
            }

            if (method == "click") {
                mouse_event(0x2, posX, posY, 0, 0);
                mouse_event(0x4, 0, 0, 0, 0);
            }

            if (method == "leftDown") {
                mouse_event(0x2, posX, posY, 0, 0);
            }

            if (method == "leftUp") {
                mouse_event(0x4, posX, posY, 0, 0);
            }

            if (method == "rightClick") {
                mouse_event(0x8, posX, posY, 0, 0);
                mouse_event(0x10, 0, 0, 0, 0);
            }

            if (method == "rightDown") {
                mouse_event(0x8, posX, posY, 0, 0);
            }

            if (method == "righttUp") {
                mouse_event(0x10, posX, posY, 0, 0);
            }
        }

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void SetCursorPos(int X, int Y);

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
    }
}
"@

Add-Type -Language CSharp -TypeDefinition $Source -ReferencedAssemblies $assemblies

[Device.Mouse]::Main($Method, $PosX, $PosY)
`
const pos = function mouse_pos(x = 0, y = 0) {
    // x と y は絶対値。
    ps(source, ['pos', x, y])
}

const click = function mouse_click(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    ps(source, ['click', x, y])
}

const leftDown = function mouse_leftDown(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    ps(source, ['leftDown', x, y])
}

const leftUp = function mouse_leftUp(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    ps(source, ['leftUp', x, y])
}

const rightClick = function mouse_rightClick(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    ps(source, ['rightClick', x, y])
}

const rightDown = function mouse_rightDown(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    ps(source, ['leftDown', x, y])
}
const rightUp = function mouse_rightUp(x = 0, y = 0) {
    // x と y は絶対値ではなく、相対値になることに注意する。
    ps(source, ['leftDown', x, y])
}

module.exports = {
    pos,
    click,
    leftDown,
    leftUp,
    rightClick,
    rightDown,
    rightUp
}