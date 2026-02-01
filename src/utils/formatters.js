export const formatRUT = (value) => {
  let raw = value.replace(/[^0-9kK]/g, "");
  if (raw.length === 0) return "";
  let dv = raw.slice(-1);
  let body = raw.slice(0, -1);
  body = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return body ? `${body}-${dv}` : dv;
};

export const formatPhone = (value) => {
  let raw = value.replace(/\D/g, "");
  if (raw.startsWith("56")) raw = raw.slice(2);
  if (raw.startsWith("9")) raw = raw.slice(1);
  raw = raw.slice(0, 8);
  let formatted = "+56 9 ";
  if (raw.length > 0) formatted += raw.slice(0, 4);
  if (raw.length > 4) formatted += " " + raw.slice(4);
  return raw.length === 0 ? "" : formatted;
};
