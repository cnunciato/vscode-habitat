import { prompt } from './message';
import { navigate } from './open';

function search(ident: string) {
  prompt('Find a package: ', 'core/node')
    .then(q => {
      if (q.trim() !== '') {
        navigate(`https://bldr.habitat.sh/#/search;q=${encodeURIComponent(q)}`)
      }
    });
}

export { search };
