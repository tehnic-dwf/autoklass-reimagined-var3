type Topic = { name: string; match: RegExp };

const topics: Topic[] = [
  { name: "Scaune și tapițerie", match: /scaun|banchet|lombar|piele artico|pachet memorie/ },
  { name: "Volan", match: /volan/ },
  {
    name: "Climatizare și confort termic",
    match:
      /climati|thermatic|caldur|temperaturi|iarna|lichid incalzit|air-balance|air control|incalzire/,
  },
  { name: "Geamuri și trapă", match: /geam|trapa|luneta/ },
  {
    name: "Depozitare și portbagaj",
    match: /depozitare|pahare|portbagaj|haion|boot confort|priza 12v/,
  },
  {
    name: "Finisaje și ambianță",
    match:
      /interio|ambient|consola centrala|plafon imbracat|structura metalica|covorase|bordului|ornamente praguri/,
  },
  {
    name: "Asistență la condus",
    match:
      /distronic|benzii|banda|franare|unghi mort|semne de circulatie|camera pentru sofer|pre sense|pachet oglinda/,
  },
  { name: "Parcare", match: /parcare|camera|mersul inapoi/ },
  { name: "Iluminare și vizibilitate", match: /digital light|faruri|stergatoare/ },
  {
    name: "Protecție și siguranță",
    match: /airbag|centuri|isofix|copii|ecall|vesta|tirefit|presiunii/,
  },
  { name: "Ecrane și multimedia", match: /display|cockpit|multimedia|mbux extinse|radio/ },
  { name: "Navigație", match: /navigation|navigatie|realitate augmentata/ },
  {
    name: "Telefon și conectivitate",
    match: /carplay|android|smartphone|usb|wireless|internet|control vocal|distanta|amprenta|nfc/,
  },
  { name: "Acces și închidere", match: /keyless/ },
  { name: "Jante și anvelope", match: /jante|anvelope/ },
  {
    name: "Motorizare și comportament rutier",
    match:
      /tronic|suspensie|hybrid|dynamic select|drive select|sunet motor|generator|cabluri de incarcare/,
  },
  {
    name: "Caroserie și pachete de design",
    match:
      /vopsea|caroseriei|aripi|exterior|styling|ornamente cromate|sport design|night|bare longitudinale|premium/,
  },
  { name: "Documente", match: /manual|document|certificat/ },
  { name: "Date de fabricație", match: /fabricatie|sasiu|emisii|leistungsvariante|transport/ },
];

/** Presentation-only grouping; preserves every equipment entry and its classification. */
export function groupEquipmentByPurpose(items: string[]) {
  const buckets = new Map<string, string[]>();
  for (const item of items) {
    const text = item
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const name = topics.find((topic) => topic.match.test(text))?.name || "Alte echipări";
    const bucket = buckets.get(name) || [];
    bucket.push(item);
    buckets.set(name, bucket);
  }
  return [...topics.map((topic) => topic.name), "Alte echipări"]
    .filter((name) => buckets.has(name))
    .map((name) => ({ name, items: buckets.get(name)! }));
}
