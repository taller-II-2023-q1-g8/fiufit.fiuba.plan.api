export async function basicGetPostDeleteTests(test, route, sampleData, seed, imposibleId) {
  test('[GET ALL] empty database', async ({ client }) => {
    const response = await client.get(route)

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('[GET ALL] after seeding', async ({ client }) => {
    const data = await seed()
    const response = await client.get(route)

    response.assertStatus(200)
    response.assertBodyContains(data)
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

export async function postWithCorrectFormatTest(test, route, index, correctSampleData) {
  test(`[POST] <${index}> correct format`, async ({ client }) => {
    const response = await client.post(route).form(correctSampleData)

    response.assertStatus(200)
    response.assertBodyContains(correctSampleData)
  })
}

export async function postWithWrongFormatTest(test, route, index, wrongSampleData) {
  test(`[POST] <${index}> wrong format`, async ({ client }) => {
    const response = await client.post(route).form(wrongSampleData)

    response.assertStatus(400)
  })
}

export async function crudTests(
  test,
  route,
  seed,
  wrongSampleDataCases,
  correctSampleDataCases,
  imposibleId
) {
  basicGetPostDeleteTests(test, route, correctSampleDataCases[0], seed, imposibleId)

  correctSampleDataCases.forEach((correctSampleData, index) =>
    postWithCorrectFormatTest(test, route, index, correctSampleData)
  )

  wrongSampleDataCases.forEach((wrongSampleData, index) =>
    postWithWrongFormatTest(test, route, index, wrongSampleData)
  )
}
