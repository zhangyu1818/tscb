import { JSONSchemaForTheTypeScriptCompilerSConfigurationFile as TypeScriptOptions } from './interface'

export type TscbConfig = TypeScriptOptions | TypeScriptOptions[]
export const defineConfig = (config: TscbConfig) => config
