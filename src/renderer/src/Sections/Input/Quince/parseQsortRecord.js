/**
 * Parses a raw Q-sort survey record (r1..r34 style object) into a clean
 * structure.
 *
 * Strategy:
 * 1. Most fields look like "(label): value" -> strip the parens, use label as key.
 * 2. A few fields are delimited lists (comma or pipe) that need splitting into
 *    arrays/objects (pos/neu/neg, sort, presortTrace).
 * 3. A few fields repeat the same outer label with a nested "(subLabel): value"
 *    (column4, columnN4) -> collect these into arrays of {slot, value}.
 * 4. itemNumN fields are free-form: numeric, comma-list, or text -> auto-coerced.
 */

/**
 * @typedef {Object} ColumnEntry
 * @property {string|null} slot
 * @property {string} value
 */

/**
 * @typedef {string|number|number[]} ItemNumValue
 */

/**
 * @typedef {Object} QSortRecord
 * @property {string} id
 * @property {string} [projectName]
 * @property {string} [randomId]
 * @property {string|null} [partId]
 * @property {string|null} [urlUsercode]
 * @property {string} [dateTime]
 * @property {string} [device]
 * @property {Object<string, string>} timing - raw "HH:MM:SS" strings, unparsed
 * @property {{pos?: number, neu?: number, neg?: number}} counts
 * @property {{pos?: number[], neu?: number[], neg?: number[]}} items
 * @property {number[]} sort
 * @property {string} presortTrace - raw "id*category*value|..." string, unparsed
 * @property {Object<string, ColumnEntry[]>} columns
 * @property {Object<string, ItemNumValue>} itemNums
 */

/**
 * @typedef {Object<string, string>} RawQSortRecord
 */

/**
 * @param {string} str
 * @returns {{label: string, value: string}|null}
 */
function parseLabeled(str) {
  const m = str.match(/^\(([^)]+)\):\s*(.*)$/);
  if (m) return { label: m[1], value: m[2] };
  return null;
}

/**
 * @param {string} v
 * @returns {string|null}
 */
function toNullable(v) {
  return /^no .* set$|^no .*id$/i.test(v) ? null : v;
}

// Turns "1,2,3" -> [1,2,3], "2" -> 2, "info - n.a." -> "info - n.a." (left as string)
/**
 * @param {string} value
 * @returns {ItemNumValue}
 */
function coerceItemNumValue(value) {
  if (/^[\d,]+$/.test(value)) {
    return value.includes(',') ? value.split(',').map(Number) : Number(value);
  }
  return value;
}

/**
 * @param {RawQSortRecord} raw
 * @returns {QSortRecord}
 */
export default function parseQSortRecord(raw) {
  const result = {
    id: raw.id,
    timing: {},
    counts: {},
    items: {},
    sort: [],
    presortTrace: '',
    columns: {},
    itemNums: {},
  };

  for (const [key, str] of Object.entries(raw)) {
    if (key === 'id') continue;
    const parsed = parseLabeled(str);

    if (parsed) {
      const { label, value } = parsed;

      switch (label) {
        case 'projectName':
          result.projectName = value;
          break;
        case 'randomId':
          result.randomId = value;
          break;
        case 'partId':
          result.partId = toNullable(value);
          break;
        case 'urlUsercode':
          result.urlUsercode = toNullable(value);
          break;
        case 'dateTime':
          result.dateTime = value; // keep as string; parse with your own date lib if needed
          break;
        case 'desktop/mobile':
          result.device = value;
          break;
        case 'timeOnConsentPage':
        case 'timeOnWelcomePage':
        case 'timeOnPresortPage':
        case 'timeOnRefinePage':
        case 'timeOnSortPage':
        case 'timeOnPostsortPage':
        case 'timeOnSurveyPage': {
          const pageName = label.replace('timeOn', '').replace('Page', '');
          const timingKey = pageName.charAt(0).toLowerCase() + pageName.slice(1);
          result.timing[timingKey] = value; // e.g. "00:00:32"
          break;
        }
        case 'numPos':
          result.counts.pos = Number(value);
          break;
        case 'numNeu':
          result.counts.neu = Number(value);
          break;
        case 'numNeg':
          result.counts.neg = Number(value);
          break;
        case 'pos':
        case 'neu':
        case 'neg':
          result.items[label] = value
            .replace(/s/gi, '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
            .map(Number);
          break;
        default:
          // Nested-label fields (column4/columnN4) are handled below since
          // `label` here would actually be the sub-label, not the outer key.
          break;
      }
      continue;
    }

    if (str.startsWith('sort:')) {
      result.sort = str
        .replace(/^sort:\s*/, '')
        .split('|')
        .map(Number);
      continue;
    }

    if (str.startsWith('presortTrace:')) {
      result.presortTrace = str.replace(/^presortTrace:\s*/, '');
      continue;
    }

    if (/^column(N)?\d+:/.test(str)) {
      const outerLabel = str.slice(0, str.indexOf(':'));
      const rest = str.slice(str.indexOf(':') + 1).trim();
      const sub = parseLabeled(rest);
      if (!result.columns[outerLabel]) result.columns[outerLabel] = [];
      result.columns[outerLabel].push({
        slot: sub ? sub.label : null,
        value: sub ? sub.value : rest,
      });
      continue;
    }

    if (/^itemNum\d+:/.test(str)) {
      const outerLabel = str.slice(0, str.indexOf(':'));
      const value = str.slice(str.indexOf(':') + 1).trim();
      result.itemNums[outerLabel] = coerceItemNumValue(value);
      continue;
    }
  }

  return result;
}
