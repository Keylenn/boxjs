const BOX_ACTIONS_NAMES = ["tryToTrackEffect", "getData", "commit"]
export default function isBox(source: any) {
  return BOX_ACTIONS_NAMES.every((name) => typeof source?.[name] === "function")
}
