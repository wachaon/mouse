using System;
using System.Runtime.InteropServices;

public class mouse {
    public static void Main (params string[] args) {
        string method = args[0];
        int posX = args.Length > 1 ? Int32.Parse(args[1]) : 0;
        int posY = args.Length > 2 ? Int32.Parse(args[2]) : 0;

        int MOUSEEVENTF_LEFTDOWN = 0x0002;
        int MOUSEEVENTF_LEFTUP = 0x0004;
        int MOUSEEVENTF_RIGHTDOWN = 0x0008;
        int MOUSEEVENTF_RIGHTUP = 0x0010;
        int MOUSEEVENTF_MIDDLEDOWN = 0x0020;
        int MOUSEEVENTF_MIDDLEUP = 0x0040;
        int MOUSEEVENTF_WHEEL = 0x0800;

        if (method == "pos") { SetCursorPos(posX, posY); }

        if (method == "click" || method == "leftDown") { mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0); }
        if (method == "click" || method == "leftUp"  ) { mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0); }

        if (method == "rightClick" || method == "rightDown") { mouse_event(MOUSEEVENTF_RIGHTDOWN, 0, 0, 0, 0); }
        if (method == "rightClick" || method == "rightUp"  ) { mouse_event(MOUSEEVENTF_RIGHTUP, 0, 0, 0, 0); }

        if (method == "middleClick" || method == "middleDown") { mouse_event(MOUSEEVENTF_MIDDLEDOWN, 0, 0, 0, 0); }
        if (method == "middleClick" || method == "middleUp"  ) { mouse_event(MOUSEEVENTF_MIDDLEUP, 0, 0, 0, 0); }

        if (method == "scroll") { mouse_event(MOUSEEVENTF_WHEEL,0,0,posX,0); }
    }

    [DllImport("user32.dll")]
    public static extern void SetCursorPos(int X, int Y);

    [DllImport("user32.dll")]
    public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
}
