// TODO: refactor message functions so they are together and related

export function joinMessage(mobName: string) {
    return JSON.stringify({ action: "join", mobName: mobName });
}

export function updateMessage(durationMinutes: number) {
    return JSON.stringify({ action: "update", value: { durationMinutes: 32 } })
}
