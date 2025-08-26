module.export = {
    apps: [
        {
            name: "proj management",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
            }
        }
    ]
};