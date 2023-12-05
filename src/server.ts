import { app } from "./app"

const PORT = Number(process.env.PORT) || 3333

app.listen(PORT, (): void => {
  console.log(`App is running at port ${PORT}`)
})