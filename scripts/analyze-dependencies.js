/*
 * @Description: 遍历所有包，分析依赖
 * @FilePath: /app-monorepo-starter/scripts/analyze-dependencies.js
 */
const fs = require('fs')
const path = require('path')

// 配置 monorepo 的根目录和包含子包的目录
const monorepoRoot = process.cwd()
const packagesDir = ['packages'] // 可以根据你的 monorepo 结构调整

// 用于存储所有包的依赖
const packageDependencies = new Map()

// 遍历目录函数
function traverseDirectory(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      const packageJsonPath = path.join(fullPath, 'package.json')

      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
        const packageName = packageJson.name

        console.log(`Analyzing package: ${packageName}`)

        // 合并 dependencies 和 devDependencies
        const dependencies = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies
        }

        packageDependencies.set(packageName, dependencies)
      }
    }
  }
}

// 遍历所有包目录
for (const dir of packagesDir) {
  traverseDirectory(path.join(monorepoRoot, dir))
}

// 查找所有包中都存在的相同依赖
function findCommonDependencies() {
  if (packageDependencies.size < 2) {
    return {}
  }

  const commonDeps = {}

  for (const [packageName, deps] of packageDependencies.entries()) {
    for (const [depName, depVersion] of Object.entries(deps)) {
      if (!commonDeps[depName]) {
        commonDeps[depName] = { count: 1, versions: { [packageName]: depVersion } }
      } else {
        commonDeps[depName].count++
        commonDeps[depName].versions[packageName] = depVersion
      }
    }
  }

  // Filter dependencies that appear in at least two packages
  const result = Object.entries(commonDeps).reduce((acc, [depName, info]) => {
    if (info.count >= 2) {
      acc[depName] = info.versions
    }
    return acc
  }, {})

  return result
}

// 分析结果
const commonDependencies = findCommonDependencies()

console.log('\nCommon Dependencies across packages:')
for (const [depName, versions] of Object.entries(commonDependencies)) {
  console.log(`${depName}:`)
  for (const [packageName, version] of Object.entries(versions)) {
    console.log(`  ${packageName}: ${version}`)
  }
  console.log('') // Add a blank line between dependencies for better readability
}

console.log(`Total number of common dependencies: ${Object.keys(commonDependencies).length}`)

// 分析版本不一致的依赖
const inconsistentVersions = Object.entries(commonDependencies).filter(
  ([_, versions]) => new Set(Object.values(versions)).size > 1
)

if (inconsistentVersions.length > 0) {
  console.log('\nDependencies with inconsistent versions:')
  for (const [depName, versions] of inconsistentVersions) {
    console.log(`${depName}:`)
    for (const [packageName, version] of Object.entries(versions)) {
      console.log(`  ${packageName}: ${version}`)
    }
    console.log('')
  }
  console.log(`Total number of dependencies with inconsistent versions: ${inconsistentVersions.length}`)
} else {
  console.log('\nAll common dependencies have consistent versions across packages.')
}
