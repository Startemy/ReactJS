import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { StoreState } from 'src/store';
import { toggleProfile } from 'src/store/profile/actions';

interface AboutProps {
  visible: boolean;
  toggle: () => void;
}

export const About: FC<AboutProps> = ({ visible, toggle }) => {
  return (
    <>
      <h2>About</h2>
      <input type="checkbox" checked={visible} onChange={e => { }} />
      <button onClick={() => toggle()}>change visible</button>
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  visible: state.profile.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggle: () => dispatch(toggleProfile()),
});

export const AboutWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
