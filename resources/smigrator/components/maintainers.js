import React from 'react';
import { FormattedMessage } from 'react-intl';
import pinfort from '@/../images/pinfort.jpg';
import neetshin from '@/../images/neetshin.jpg';

const maintainers = [
  { name: 'Pinfort',  username: 'pinfort',  avatar: pinfort },
  { name: 'Neetshin', username: 'neetshin', avatar: neetshin },
];

const handleClick = e => {
  e.preventDefault();
  const maintainer = maintainers[e.currentTarget.getAttribute('data-index')];

  setTimeout(() => {
    window.location = `https://t.me/${maintainer.username}`;
  }, 200);

  window.location = `tg://resolve?domain=${maintainer.username}`;
};


const Maintainers = () => {
  return (
    <div className='maintainers module'>
      <h5 className='maintainers__title'>
        <FormattedMessage id='maintainers' defaultMessage='Maintainers' />
      </h5>

      <ul className='maintainers__list'>
        {
          maintainers.map((maintainer, i) => (
            <li className='maintainers__list-item maintainer' key={maintainer.username} >
              <a href={`https://t.me/${maintainer.username}`} onClick={handleClick} data-index={i}>
                <div className='maintainer__avatar'>
                  <img src={maintainer.avatar} alt={maintainer.name} />
                </div>

                <div className='maintainer__meta'>
                  <h4 className='maintainer__name'>{maintainer.name}</h4>
                  <span className='maintainer__username'>@{maintainer.username}</span>
                </div>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Maintainers;
