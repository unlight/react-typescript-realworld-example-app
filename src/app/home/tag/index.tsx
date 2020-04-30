import React from 'react';
import { connect } from 'react-redux';

import { TagList } from './tag-list.component';
import { mapDispatchToProps, mapStateToProps, tagReducer } from './tags.state';

const initialState = { url: 'https://conduit.productionready.io/api/tags' };

const ConnectedTagList = connect(mapStateToProps, mapDispatchToProps)(TagList);

export { tagReducer, ConnectedTagList };
