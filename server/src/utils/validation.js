function validateEventData(eventData) {
  const { time, location, backBlazeImgKey, description, rootTag } = eventData;
  return time && location && backBlazeImgKey && description && rootTag;
}

function trimUnusedFields(obj) {
  let mutableCopy = { ...obj };
  for (let key in mutableCopy) {
    if (!mutableCopy[key]) delete mutableCopy[key];
  }

  return mutableCopy;
}

export { validateEventData, trimUnusedFields };
