export function childrenToSlots(
    children: JSX.Element | JSX.Element[],
): Record<string, JSX.Element | JSX.Element[]> {
    if (Array.isArray(children)) {
        const result = {};

        children.forEach((item) => {
            const slotName = getSlotName(item);
            let exisingElementInSlot = result[slotName];
            if (exisingElementInSlot) {
                if (!Array.isArray(exisingElementInSlot)) {
                    result[slotName] = exisingElementInSlot = [exisingElementInSlot];
                }
                exisingElementInSlot.push(item);
            } else {
                result[slotName] = item;
            }
        });

        return result;
    }

    return {
        [getSlotName(children)]: children,
    };
}

function getSlotName(item?: JSX.Element): string {
    return item?.props?.slot ?? 'default';
}
