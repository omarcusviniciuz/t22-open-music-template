export async function fetchAlbums() {
  try {
    const response = await fetch('https://openmusic-fake-api.onrender.com/api/musics');
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados da API');
    }
    const data = await response.json();
    return data; // retorna o array de objetos
  } catch (error) {
    console.error('Erro na API:', error);
    return []; // retorna array vazio se falhar
  }
}