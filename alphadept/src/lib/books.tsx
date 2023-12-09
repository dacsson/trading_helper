import { promises as fs } from 'fs';

export async function get_all_books() {
  const file = await fs.readFile(process.cwd() + '/books.json', 'utf8');
  const data = JSON.parse(file);
  return data.books.map(({id}: {id : string}) => {
	return {
	  params: {
		id: id
	  },
	};
  });
}

export async function get_book_data_by_id(id : string) {
  const file = await fs.readFile(process.cwd() + '/books.json', 'utf8');
  const data = JSON.parse(file).books;
  return data[parseInt(id)-1];
}