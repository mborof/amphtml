/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {createContext, createElement, useContext} from './index';

/** @type {Preact.Context} */
let context;

/**
 * The external context given to React components to control whether they can
 * render/play/etc.
 *
 * - renderable: whether this vDOM area is renderable. Analogous to
 *   `display-locking` CSS.
 * - playable: whether the playback is allowed in this vDOM area. If playback
 *   is not allow, the component must immediately stop the playback.
 *
 * @return {!Preact.Context}
 */
export function getAmpContext() {
  return (
    context ||
    (context = createContext({
      'renderable': true,
      'playable': true,
    }))
  );
}

/**
 * A wrapper-component that recalculates and propagates AmpContext properties.
 *
 * @param {!JsonObject} props
 * @return {!Preact.VNode}
 */
export function withAmpContext(props) {
  const parent = useContext(getAmpContext());
  const current = {
    ...props,
    'renderable': parent['renderable'] && props['renderable'],
    'playable': parent['playable'] && props['playable'],
    'children': undefined,
  };

  return createElement(getAmpContext().Provider, {
    children: props['children'],
    value: current,
  });
}
