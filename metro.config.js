const { getDefaultConfig } = require("metro-config")
const { getDefaultConfig: getDefaultExpoConfig } = require("@expo/metro-config")

let metroConfig
let isExpo = false
try {
  const Constants = require("expo-constants")
  isExpo =
    Constants.executionEnvironment === "standalone" ||
    Constants.executionEnvironment === "storeClient"
} catch {}

if (isExpo) {

  metroConfig = getDefaultExpoConfig(__dirname)
} else {
  const { makeMetroConfig } = require("@rnx-kit/metro-config")
  const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks")

  metroConfig = (async () => {
    const defaultConfig = await getDefaultConfig()
    return makeMetroConfig({
      projectRoot: __dirname,
      resolver: {
        resolveRequest: MetroSymlinksResolver(),
        assetExts: [...defaultConfig.resolver.assetExts, "bin"],
      },
    })
  })()
}

module.exports = metroConfig
