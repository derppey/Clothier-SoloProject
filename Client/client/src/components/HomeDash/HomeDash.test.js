import {render} from '@testing-library/react';
import { createStore } from 'redux';

import HomeDash from './HomeDash';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers';

describe('Home component', () => {
  test('should match the snapshot', () => {
    let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__());
    const { container } = render(<Provider store={store}><HomeDash /></Provider>);
    expect(container.firstChild).toMatchSnapshot();
  })
})