import { checkError, client } from './client.js';
export async function getMovies() {
  const resp = await client.from('movies').select('*');
  return checkError(resp);
}

export async function getMoviesWithDirector() {
  const resp = await client.from('movies').select(`director_id, directors(name)`);
  return checkError(resp);
}

export async function getDirectorNames() {
  const resp = await client.from('directors').select('name');
  return checkError(resp);
}

export async function getMovieById(id) {
  const resp = await client.from('movies').select('*').match({ id }).single();
  return checkError(resp);
}

export async function getMovieByTitle(title) {
  const resp = await client.from('movies').select('*').match({ title }).single();
  return checkError(resp);
}

export async function getOldestMovie() {
  const resp = await client.from('movies').select('*').gt('year', 0).limit(1).single();
  return checkError(resp);
}

export async function getMoviesAfter(year) {
  const resp = await client.from('movies').select('title').gt('year', year);
  return checkError(resp);
}

export async function getHighestGrossingMovie() {
  const resp = await client
    .from('movies')
    .select('*')
    .order('box_office', { ascending: false })
    .single(1)
    .limit(1);
  return checkError(resp);
}

//
