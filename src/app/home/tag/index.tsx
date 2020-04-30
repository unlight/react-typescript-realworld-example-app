import React from 'react';
import { connect } from 'react-redux';

import { TagList } from './tag-list';
import { mapDispatchToProps, mapStateToProps, tagReducer } from './tag.state';

const ConnectedTagList = connect(mapStateToProps, mapDispatchToProps)(TagList);

export { tagReducer, ConnectedTagList };
