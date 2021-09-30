import {render} from '@testing-library/react';
import { createStore } from 'redux';

import HomeDash from './HomeDash';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers';

describe('Home component', () => {
  test('should match the snapshot', () => {
    let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__());
    
    const Wrapper = ({ children }) => (
        // you could just use your normal Redux store or create one just for the test
        <Provider store={store}>{children}</Provider>
    );
    const { container } = render(<HomeDash />, {wrapper: Wrapper});
    expect(container.firstChild).toMatchSnapShot();
  })
})