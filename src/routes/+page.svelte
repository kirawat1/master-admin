<script lang="ts">
	import type { Users } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	let users: Users[] = data.users;

	let isModalOpen = false;

	let modelUser: Users | null = null;

	let isAscending = true;

	function toggleSorting() {
		isAscending = !isAscending;

		users = users.sort((a, b) => {
			if (isAscending) {
				return a.id - b.id;
			} else {
				return b.id - a.id;
			}
		});
	}

	import { Button } from 'flowbite-svelte';
	import { Input, Label, Helper } from 'flowbite-svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { Modal } from 'flowbite-svelte';
	import { Heading } from 'flowbite-svelte';
</script>

<div class="flex flex-col items-center">
	<div class="container flex flex-row gap-4">
		<div class="flex flex-col gap-4 p-4 w-full">
			<Heading tag="h2" customSize="text-4xl font-extrabold ">ค้นหาเจ้าของ</Heading>

			<Heading tag="h5">เพิ่มรายการ</Heading>
			<form method="POST">
				<div class="grid gap-2 mb-6 md:grid-cols-1">
					<div>
						<Label for="firstname" class="mb-2">First name</Label>
						<Input type="text" name="firstname" id="firstname" placeholder="John" required />
					</div>
					<div>
						<Label for="lastname" class="mb-2">Last name</Label>
						<Input type="text" name="lastname" id="lastname" placeholder="Doe" required />
					</div>
					<div>
						<Label for="tel" class="mb-2">Phone number</Label>
						<Input
							type="tel"
							name="tel"
							id="tel"
							placeholder="1234506780"
							pattern={'[0-9]{10}'}
							required
						/>
					</div>
					<div>
						<Label for="email" class="mb-2">Email address</Label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="john.doe@company.com"
							required
						/>
					</div>
				</div>

				<Button type="submit" formaction="?/add" class="w-full">Add New Master</Button>
			</form>
		</div>
		<div class="flex flex-col gap-4 w-full p-4">
			<Heading tag="h5">จัดการรายการ</Heading>
			<Table striped={true} hoverable={true} class="w-full">
				<TableHead>
					<TableHeadCell on:click={toggleSorting}>ID</TableHeadCell>
					<TableHeadCell>Name</TableHeadCell>
					<TableHeadCell>Tel</TableHeadCell>
					<TableHeadCell>Email</TableHeadCell>
					<TableHeadCell shadow={true}>Operter</TableHeadCell>
					<TableHeadCell>
						<span class="sr-only">Edit</span>
					</TableHeadCell>
				</TableHead>

				<TableBody class="divide-y">
					{#if users?.length}
						{#each users as user}
							<TableBodyRow>
								<TableBodyCell>
									{user.id}
								</TableBodyCell>
								<TableBodyCell
									><button
										class="font-medium text-primary-600 hover:underline dark:text-primary-500"
										on:click={() => {
											modelUser = users.filter((element) => element.id == user.id)[0];
											isModalOpen = true;
										}}
									>
										{user.firstname}
										{user.lastname}
									</button>
								</TableBodyCell>
								<TableBodyCell>
									{user.tel}
								</TableBodyCell>
								<TableBodyCell>
									{user.email}
								</TableBodyCell>
								<TableBodyCell>
									<button
										class="font-medium text-primary-600 hover:underline dark:text-primary-500"
										on:click={() => {
											modelUser = users.filter((element) => element.id == user.id)[0];
											isModalOpen = true;
										}}
									>
										Edit
									</button>
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					{:else}
						No master here
					{/if}
				</TableBody>
			</Table>
		</div>

		{#if modelUser}
			<form method="post" class="flex flex-col space-y-6">
				<Modal title="Edit information" bind:open={isModalOpen} autoclose={false}>
					<Label class="space-y-2">
						<span>Id</span>
						<Input type="text" name="id" value={modelUser.id} required />
					</Label>
					<div class="grid gap-6 mb-6 md:grid-cols-2">
						<Label class="space-y-2">
							<span>Firstname</span>
							<Input type="text" name="firstname" value={modelUser.firstname} required />
						</Label>
						<Label class="space-y-2">
							<span>Lastname</span>
							<Input type="text" name="lastname" value={modelUser.lastname} required />
						</Label>
						<Label class="space-y-2">
							<span>Tel.</span>
							<Input type="text" name="tel" value={modelUser.tel} required />
						</Label>
						<Label class="space-y-2">
							<span>Email</span>
							<Input type="text" name="email" value={modelUser.email} required />
						</Label>
					</div>
					<svelte:fragment slot="footer">
						<div class="flex flex-row gap-4 w-full justify-between">
							<div>
								<Button
									color="alternative"
									on:click={() => {
										isModalOpen = false;
									}}>Cancel</Button
								>
								<Button type="submit" color="alternative" formaction="?/delete">Delete</Button>
							</div>
							<Button type="submit" formaction="?/update">Save</Button>
						</div>
					</svelte:fragment>
				</Modal>
			</form>
		{/if}
	</div>
</div>
