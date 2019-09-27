import Vue from "vue";
import { format, differenceInCalendarYears, startOfToday, getYear } from "date-fns";
import { en } from "date-fns/locale";

Vue.filter("formatDate", function(value, dateFormat = "dd.MMM.yy") {
  if (value) {
    return format(new Date(String(value)), dateFormat, { en });
  }
});
Vue.filter("age", function(value) {
  if (value) {
    return differenceInCalendarYears(startOfToday(), new Date(String(value)));
  }
});
Vue.filter("year", function(value) {
  if (value) {
    return getYear(new Date(String(value)));
  }
});
Vue.filter("pluralize", function(value, word, options) {
  options = options || {};
  var output = "";
  var includeNumber = options.includeNumber != null ? options.includeNumber : false;
  if (includeNumber === true) output += value + " ";
  if ((!value && value !== 0) || !word) return output;
  if (Array.isArray(word)) {
    output += word[value - 1] || word[word.length - 1];
  } else {
    output += word + (value === 1 ? "" : "s");
  }
  return output;
});
Vue.filter("formatUrl", function(value) {
  if (value) {
    return value.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");
  }
});
Vue.filter("capitalize", function(value) {
  if (value) {
    if (typeof value !== "string") return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
});
