export async function crud_tests(test, route, sampleData, seed, imposibleId) {
  test('[GET ALL] empty database', async ({ client }) => {
      const response = await client.get(route)
  
      response.assertStatus(200)
      response.assertBodyContains([])
    })
  
    test('[GET ALL] after seeding', async ({ client }) => {
      const data = seed()
      const response = await client.get(route)
  
      response.assertStatus(200)
      response.assertBodyContains(data)
    })
  
    test('[POST]', async ({ client }) => {
  
      const response = (await client.post(route).form(sampleData))
  
      response.assertStatus(200)
      response.assertBodyContains(sampleData)
    })
  
    test('[GET] non existent', async ({ client }) => {
  
      const response = await client.get(route + `/${imposibleId}`)
  
      response.assertStatus(404)
    })
  
    test('[POST -> GET]', async ({ client }) => {
  
      const registered = (await client.post(route).form(sampleData)).body()
      const response = await client.get(route + `/${registered.id}`)
  
      response.assertStatus(200)
      response.assertBodyContains(registered)
    })
  
    test('[DELETE] non existent', async ({ client }) => {
  
      const response = await client.delete(route + `/${imposibleId}`)
  
      response.assertStatus(404)
    })
  
    test('[POST -> DELETE]', async ({ client }) => {
  
      const registered = (await client.post(route).form(sampleData)).body()
      const response = await client.delete(route + `/${registered.id}`)
  
      response.assertStatus(200)
      response.assertTextIncludes('DELETED')
    })
}