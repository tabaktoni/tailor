<template>
  <li class="comment">
    <v-avatar size="34" class="comment-avatar">
      <img :src="author.imgUrl">
    </v-avatar>
    <div class="comment-body pl-3">
      <div class="header">
        <span class="author">{{ author.fullName || author.email }}</span>
        <v-icon v-if="isEdited" size="16" class="ml-1">
          mdi-pencil-outline
        </v-icon>
      </div>
      <text-editor
        v-model="content"
        :is-focused="isEditing"
        :show-preview="!isEditing"
        class="content" />
      <span v-if="isEditing" class="float-right">
        <v-btn @click="reset" text small>Cancel</v-btn>
        <v-btn @click="save" :disabled="!content.trim()" color="green" text small>
          <v-icon class="pr-1">mdi-check</v-icon> Save changes
        </v-btn>
      </span>
      <timeago
        v-else
        :datetime="comment.createdAt"
        :auto-update="60"
        class="time" />
    </div>
    <v-menu v-if="showOptions" bottom left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon x-small>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          v-for="{ name, action, icon } in options"
          :key="name"
          @mousedown.prevent="action">
          <v-list-item-title class="text-left">
            <v-icon small class="pr-1">{{ icon }}</v-icon>
            {{ name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </li>
</template>

<script>
import { focus } from 'vue-focus';
import { mapState } from 'vuex';
import TextEditor from './TextEditor';

export default {
  name: 'thread-comment',
  props: {
    comment: { type: Object, required: true }
  },
  data: vm => ({ isEditing: false, content: vm.comment.content }),
  computed: {
    ...mapState({ user: state => state.auth.user }),
    author: vm => vm.comment.author,
    isEdited: vm => vm.comment.createdAt !== vm.comment.updatedAt,
    isDeleted: vm => !!vm.comment.deletedAt,
    isAuthor: vm => vm.author.id === vm.user.id,
    showOptions: vm => vm.isAuthor && !vm.isDeleted,
    options() {
      return [
        { name: 'Edit', action: this.toggleEdit, icon: 'mdi-pencil' },
        { name: 'Remove', action: this.remove, icon: 'mdi-delete' }
      ];
    }
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    save() {
      if (!this.content) return;
      this.toggleEdit();
      this.$emit('update', this.comment, this.content);
    },
    remove() {
      this.$emit('remove', this.comment);
    },
    reset() {
      this.content = this.comment.content;
      this.isEditing = false;
    }
  },
  watch: {
    comment: {
      deep: true,
      handler() {
        this.reset();
      }
    }
  },
  directives: { focus },
  components: { TextEditor }
};
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  margin-bottom: 1.25rem;
  font-family: Roboto, Arial, sans-serif;

  &-avatar {
    width: 2.5rem;
    margin-top: 0.375rem;
  }

  &-body {
    flex: 1;
  }

  .author {
    font-size: 1rem;
  }

  .content {
    margin: 0.375rem 0 0 0;
  }

  .time {
    color: #888;
    font-size: 0.75rem;
  }
}

.v-menu__content {
  cursor: pointer !important;
}
</style>
