<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 评论管理</el-breadcrumb-item>
                <el-breadcrumb-item>评论列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="comments.rows" border style="width: 100%">
            <el-table-column prop="id" label="编号" sortable width="120">
            </el-table-column>
            <el-table-column prop="pid" label="父编号" sortable width="150">
            </el-table-column>
            <el-table-column prop="topic.title" label="主题名称" sortable>
            </el-table-column>
            <el-table-column prop="user.name" label="用户" sortable>
            </el-table-column>
            <el-table-column prop="content" label="评论内容" sortable>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" sortable>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="pageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { Message } from 'element-ui';
    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 15,
                total: 0,
            };
        },
        computed: {
            ...mapGetters({
                comments: 'comments'
            })
        },
        beforeMount() {
            this.getUserList();
        },
        methods: {
            getUserList() {
                const self = this;
                self.$store.dispatch('comments', {
                    page: self.currentPage,
                    order: 'id asc',
                    limit: self.pageSize
                }).then( result => {
                    if (result.error) {
                        Message({
                            type: 'error',
                            showClose: true,
                            message: result.msg
                        });
                    } else {
                        self.pageSize = result.limit;
                        self.currentPage = result.page;
                        self.total = result.count;
                    }
                });
            },
            pageChange(currentPage) {
                this.currentPage = currentPage;
                this.getUserList();
            }
        }
    }
</script>