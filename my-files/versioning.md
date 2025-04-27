## ✅ Versioning Chain (Standard Practice)

1. x.y.z-alpha.n   (alpha: internal/dev preview)
2. x.y.z-beta.n    (beta: wider testing, feature-complete)
3. x.y.z           (stable release)

Example:

- 1.2.0-alpha.0 → 1.2.0-alpha.1 → 1.2.0-beta.0 → 1.2.0-beta.1 → 1.2.0


## 🚀 How to Manage These with `npm version`

### 🔹 Bump to alpha

```bash
npm version prerelease --preid=alpha
```

→ If current is 1.2.0, result: 1.2.1-alpha.0
→ If already 1.2.1-alpha.0, result: 1.2.1-alpha.1

### 🔹 Bump to beta

```bash
npm version prerelease --preid=beta
```

→ If currently 1.2.1-alpha.3, result: 1.2.1-beta.0

### 🔹 Bump to stable release

```bash
npm version patch   # or minor / major
```

→ Will remove -alpha.x or -beta.x and move to 1.2.1


