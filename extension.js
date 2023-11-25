/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import {Extension} from "resource:///org/gnome/shell/extensions/extension.js";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import Meta from "gi://Meta"
import Shell from "gi://Shell"

export default class CenterWindow extends Extension {
  enable() {
    Main.wm.addKeybinding(
      "center-window-hotkey",
      this.getSettings("org.gnome.shell.extensions.centerwindow"),
      Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
      Shell.ActionMode.NORMAL,
      this._center.bind(this)
    );
  }

  disable() {
    Main.wm.removeKeybinding("center-window-hotkey");
  }

  _center() {
    let win = global.display.focus_window;
    if (win == null) {
      return false;
    }

    win.unmaximize(Meta.MaximizeFlags.BOTH);
    win.move_resize_frame(false, 640, 0, 1280, 1920);
  }
}
