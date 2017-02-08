import VuexCollection from '../helpers/collection.js';
import updatePosition from '../../utils/updatePosition.js';

const { action, build, getter } = new VuexCollection('activity');

getter(function activities() {
  return this.state.items;
}, { global: true });

action(function reorder({ activity, positionData, newPosition }) {
  activity.position = updatePosition(positionData);
  this.commit('save', activity);
  return this.api.post(`${activity.id}/reorder`, { position: newPosition })
    .then(res => {
      let activity = res.data.data;
      this.api.setCid(activity);
      this.commit('save', activity);
    });
});

export default build();
