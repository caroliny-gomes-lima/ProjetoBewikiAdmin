export default function getEnabledUsers(response) {
  if (response.status === 204) {
    return { data: { content: [], totalPages: 0 } };
  }
  let data = response.data.content.map((item, i) => {
    return {
      id: item.id,
      name: item.name + " " + item.lastName,
      email: item.email,
      date: item.createdAt,
    };
  });

  return {
    ...response,
    data: { content: data, totalPages: response.data.totalPages },
  };
}
