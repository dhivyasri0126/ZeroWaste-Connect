# Run backend + frontend on Windows (CMD / PowerShell)

Your backend is a Spring Boot app under `zerowaste/`.

## Backend

### Option A) Windows CMD (recommended for this project)
1. Open a new terminal tab
2. Run:
```bat
cd d:\ZeroWaste Connect\zerowaste
.mvnw spring-boot:run
```

You should see Spring Boot startup logs including something like:
- `Started ...`
- `Tomcat started on port(s): 8081`

> Server port: `http://localhost:8081` (from `zerowaste/src/main/resources/application.properties`)

### Option B) PowerShell
In PowerShell, run:
```powershell
cd d:\ZeroWaste Connect\zerowaste
.mvnw spring-boot:run
```

## Frontend
In a separate terminal tab:

```bat
cd d:\ZeroWaste Connect\frontend
npm start
```

## Notes about “process stops after build success”
If the backend appears to stop right after Maven prints build success, the command runner may be using a shell that doesn’t keep the Spring process attached.
Running backend in its own terminal tab (and avoiding shell chaining operators) resolves this in most cases.


