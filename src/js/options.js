'use strict';

const calendars = ['aequirys', 'desamber', 'monocal', 'gregorian'];
const secpro = ['sector', 'sec', 'project', 'pro'];
const statformats = ['decimal', 'human'];
const timeformats = ['24', '12', 'decimal'];

Log.options = {

  set: {
    /**
     * Set accent
     * @param {string} a - Accent
     */
    accent (a) {
      if (a === undefined) return;
      Log.config.ui.accent = a;
      Log.options.update.config();
    },

    /**
     * Set background colour
     * @param {string} bg
     */
    bg (bg) {
      if (bg === undefined) return;
      Log.config.ui.bg = bg;
      Log.options.update.config();
    },

    /**
     * Set calendar system
     * @param {string} cal
     */
    calendar (cal) {
      if (cal === undefined) return;
      if (!~calendars.indexOf(cal)) return;
      c_display = {};
      Log.config.system.calendar = cal;
      Log.options.update.config();
    },

    /**
     * Set sector/project colour code
     * @param {string} mode - Sector or project
     * @param {string} key - Name
     * @param {string} colour
     */
    colourCode (mode, key, colour) {
      if (!~secpro.indexOf(mode)) return;
      if (key === undefined || colour === undefined) return;

      if (mode === 'sector' || mode === 'sec') {
        Log.palette[key] = colour;
        Log.options.update.palette();
      } else {
        Log.projectPalette[key] = colour;
        Log.options.update.projectPalette();
      }
    },

    /**
     * Set colour mode
     * @param {string} mode - Sector, project, or none
     */
    colourMode (mode) {
      if (mode === undefined) return;
      if (!~secpro.indexOf(mode) && mode !== 'none') return;

      switch (mode) {
        case 'sector':  case 'sec': mode = 'sc'; break;
        case 'project': case 'pro': mode = 'pc'; break;
        default: break;
      }

      Log.config.ui.colourMode = mode;
      Log.options.update.config();
    },

    /**
     * Set foreground colour (text colour)
     * @param {string} colour
     */
    fg (colour) {
      if (colour === undefined) return;
      Log.config.ui.colour = colour;
      Log.options.update.config();
    },

    /**
     * Set stat display format
     * @param {string} f - Decimal or human
     */
    stat (f) {
      if (f === undefined) return;
      if (!~statformats.indexOf(f)) return;
      Log.config.ui.stat = f;
      Log.options.update.config();
    },

    /**
     * Set time system
     * @param {string} f - 24, 12, or decimal
     */
    time (f) {
      if (f === undefined) return;
      if (!~timeformats.indexOf(f)) return;
      Log.config.system.timeFormat = f;
      Log.options.update.config();
    },

    /**
     * Set view
     * @param {number} days
     */
    view (days) {
      if (days === undefined) return;
      if (days < 0) return;
      Log.config.ui.view = days;
      Log.options.update.config();
    }
  },

  update: {

    /**
     * Update everything
     */
    all () {
      this.config(false);
      this.palette(false);
      this.projectPalette(false);
      this.log(false);
      this.localStorage();
    },

    /**
     * Update config
     * @param {boolean} [ls] - Update localStorage?
     */
    config (ls = true) {
      dataStore.set('config', Log.config);
      console.log('Config updated');
      ls && Log.options.update.localStorage();
    },

    /**
     * Update localStorage
     */
    localStorage () {
      localStorage.setItem('user', JSON.stringify(user));
      journalCache = {};
      console.log('localStorage updated');
      Log.refresh();
    },

    /**
     * Update log
     * @param {boolean} [ls] - Update localStorage?
     */
    log (ls = true) {
      if (Log.entries.length === 0) {
        console.error('Empty log');
        return;
      }

      dataStore.set('log', Log.entries);
      Log.log = Log.data.parse(Log.entries);
      console.log('Log updated');
      ls && Log.options.update.localStorage();
    },

    /**
     * Update sector palette
     * @param {boolean} [ls] - Update localStorage?
     */
    palette (ls = true) {
      if (Log.palette === {}) {
        console.error('Empty sector palette');
        return;
      }

      dataStore.set('palette', Log.palette);
      console.log('Sector palette updated');
      ls && Log.options.update.localStorage();
    },

    /**
     * Update proejct palette
     * @param {boolean} [ls] - Update localStorage?
     */
    projectPalette (ls = true) {
      if (Log.projectPalette === {}) {
        console.error('Empty roject palette');
        return;
      }

      dataStore.set('projectPalette', Log.projectPalette);
      console.log('Project palette updated');
      ls && Log.options.update.localStorage();
    },
  },
};
