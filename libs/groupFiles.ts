import { randomUUID } from 'node:crypto'
import { join } from "node:path";
import { writeFile, readFile, rm } from 'node:fs/promises'
import { DATAFOLDER } from "./constants";
import type { GroupInfo } from "@/types";

const getGroupFilePath = (groupId: string) => join(DATAFOLDER, `${groupId}.json`)

export const generateGroupId = () => randomUUID()

export const writeGroupData = async (groupInfo: GroupInfo) => {
    const filePath = getGroupFilePath(groupInfo.id)
    await writeFile(filePath, JSON.stringify(groupInfo))
} 