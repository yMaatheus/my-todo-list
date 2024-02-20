import { TaskCard } from '@/components/task-card'

type PageParams = {
  params: {
    id: string
  }
}

export type Task = {
  taskId: string
  name: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

type TaskResponseData = {
  name: string
  tasks: Task[]
}

export default async function Page({ params }: PageParams) {
  const { id } = params
  const result = await fetch(`http://localhost:3333/task/${id}`)

  const data = (await result.json()) as TaskResponseData

  console.log(data)

  return (
    <div className="flex flex-1 justify-center items-center h-screen flex-col space-y-6">
      <h1>Tarefas</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="flex flex-col items-center justify-center space-y-4">
        {data?.tasks?.map((task) => <TaskCard key={task.taskId} task={task} />)}
      </div>
    </div>
  )
}
