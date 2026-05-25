/* Mock adapter : unit test file */

import { LLMAdapter } from "./types"

export const askMock: LLMAdapter = async (message) => {
    const resMock = `you sent : ${message}`
    return resMock
}