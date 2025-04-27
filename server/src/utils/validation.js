function validateEventData(eventData) {
    const { time, location, backBlazeImgKey, description, rootTag } = eventData;
    return time && location && backBlazeImgKey && description && rootTag;
}

export { validateEventData }